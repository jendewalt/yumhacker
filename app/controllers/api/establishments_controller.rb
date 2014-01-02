class Api::EstablishmentsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, :only => [:create]

  
  include Geocoder
  include GooglePlaces

	def index
    lat = params[:lat] || 37.7749295
    lng = params[:lng] || -122.4194155
    from_followed = params[:from_followed] || false
    radius = params[:radius] || 5 # Radius in miles
    page = params[:page] || 1

    if from_followed == 'true' && current_user
      # convert miles to degrees = 1.0/(60 * 1.15078)

      # Find estabs in bouding box area ... get center and radius from params to expand center point to radius to give bounding box.

      @establishments = Establishment.from_users_followed_by(current_user).includes(:hours).where("ST_Contains(ST_Expand(ST_geomFromText('POINT (? ?)', 4326), ?), establishments.latlng :: geometry)", lng.to_f, lat.to_f, radius.to_f * 1.0/(60 * 1.15078)).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry")
    else
      @establishments = Establishment.includes(:hours).where("ST_Contains(ST_Expand(ST_geomFromText('POINT (? ?)', 4326), ?), establishments.latlng :: geometry)", lng.to_f, lat.to_f, radius.to_f * 1.0/(60 * 1.15078)).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry")
    end
    @establishments = @establishments.page(page).per(10)
	end

  def show
    @establishment = Establishment.includes(:hours).friendly.find(params[:id])
  end

  def create
    @establishment = Establishment.find_by(google_id: params[:google_id])

    unless @establishment
      @establishment = Establishment.create(name: params[:name], formatted_address: params[:formatted_address], price: params[:price], google_id: params[:google_id])
      @establishment.latlng = Establishment.rgeo_factory_for_column(:latlng, {}).point(params[:lng], params[:lat])
      @establishment.save
    end

    current_user.endorse!(@establishment.id) unless current_user.endorsing?(@establishment.id)

    unless params[:reference].nil?
      details = google_places_details(params[:reference])
      hours = details[:hours]
      details.delete(:hours)
      hours.each do |hour|
        @establishment.hours.create!(hour)
      end
      @establishment.update_attributes(details)
      @establishment.slug = nil
      @establishment.save!
    end
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
      radius = 100
      @establishments = google_places(query, lat, lng)

      wild_query = "%#{query.downcase.gsub(/\s+/, '%')}%"

      database_establishments = Establishment.where('LOWER(name) LIKE ?', wild_query).where("ST_Contains(ST_Expand(ST_geomFromText('POINT (? ?)', 4326), ?), establishments.latlng :: geometry)", lng.to_f, lat.to_f, radius.to_f * 1.0/(60 * 1.15078)).order("latlng :: geometry <-> 'SRID=4326;POINT(#{lng.to_f} #{lat.to_f})' :: geometry").limit(3)
      
      @establishments = database_establishments + @establishments unless database_establishments.empty?

      @establishments.uniq!{ |estab| estab[:google_id] }

      @establishments
    else
      render :json => []
    end
  end

  def endorsers
    @establishment = Establishment.includes(:users).find(params[:establishment_id])
  end
end