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
    @establishment = Establishment.create(name: params[:name], formatted_address: params[:formatted_address], price: params[:price])
    @establishment.latlng = Establishment.rgeo_factory_for_column(:latlng).point(params[:lng], params[:lat])
    @establishment.save 

    current_user.endorse!(@establishment.id)
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
    else
      render :json => []
    end
  end

end