class Api::GeolocationsController < ApplicationController
    respond_to :json

    include Geocoder

    def index
        query = params[:query]
        if query && !query.strip.empty?
            @geolocations = geocode(query)
        else
          render :json => []
        end
    end
end