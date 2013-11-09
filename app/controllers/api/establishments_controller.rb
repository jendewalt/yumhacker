class Api::EstablishmentsController < ApplicationController
  respond_to :json
  
  include Geocoder
  include GooglePlaces

	def index
		@establishments = Establishment.all
	end

  def show
    @establishment = Establishment.find(params[:id])
  end

  def create
    @establishment = Establishment.find_by_google_id(params[:google_id])

    unless @establishment
      @establishment = Establishment.create(name: params[:name], formatted_address: params[:formatted_address], price: params[:price], google_id: params[:google_id])
      @establishment.latlng = Establishment.rgeo_factory_for_column(:latlng).point(params[:lng], params[:lat])
      @establishment.save
    end

    unless current_user.endorsing?(@establishment.id)
      current_user.endorse!(@establishment.id)
    end

    logger.debug('$$$$$$$$$$$$$$$$$')
    logger.debug(@establishment)
    # Reference is returning nil.........?

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