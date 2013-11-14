class Api::EstablishmentsController < ApplicationController
  respond_to :json
  
  include Geocoder
  include GooglePlaces

	def index
    params[:lat] ||= 37.7749295
    params[:lng] ||= -122.4194155
    params[:from_followed] ||= false
    params[:radius] ||= 3000 # Radius in meters

    lat = params[:lat]
    lng = params[:lng]
    radius = params[:radius]
    from_followed = params[:from_followed]

    if from_followed == 'true' && current_user
      @establishments = Establishment.from_users_followed_by(current_user).where("ST_DWithin(latlng, ST_geomFromText('POINT (? ?)', 4326), ?)", lng.to_f, lat.to_f, radius.to_f).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry")
    else
      @establishments = Establishment.where("ST_DWithin(latlng, ST_geomFromText('POINT (? ?)', 4326), ?)", lng.to_f, lat.to_f, radius.to_f).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry")
    end
	end

  def show
    @establishment = Establishment.find(params[:id])
  end

  def create
    @establishment = Establishment.find_by(:google_id => params[:google_id])

    unless @establishment
      @establishment = Establishment.create(name: params[:name], formatted_address: params[:formatted_address], price: params[:price], google_id: params[:google_id])
      @establishment.latlng = Establishment.rgeo_factory_for_column(:latlng).point(params[:lng], params[:lat])
      @establishment.save
    end

    unless current_user.endorsing?(@establishment.id)
      current_user.endorse!(@establishment.id)
    end

    unless params[:reference].nil?
      details = google_places_details(params[:reference])
      hours = details[:hours]
      details.delete(:hours)
      hours.each do |hour|
        @establishment.hours.create!(hour)
      end
      @establishment.update_attributes(details)
    end

    render :json => @establishment.to_json
  end

  def search
    query = params[:query]    
    location = params[:location]

    if location && !location.strip.empty?
      geocoded_location = geocode(location)[0]
    else
      render :json => [] and return
    end

    if query && !query.strip.empty?
      lat = geocoded_location[:lat]
      lng = geocoded_location[:lng]
      @establishments = google_places(query, lat, lng)

      wild_query = "%#{query.downcase.gsub(/\s+/, '%')}%"

      database_establishments = Establishment.where('LOWER(name) LIKE ?', wild_query).limit(3)
      
      @establishments = database_establishments + @establishments unless database_establishments.empty?

      @establishments.uniq!{ |estab| estab[:google_id] }

      @establishments
    else
      render :json => []
    end
  end

end