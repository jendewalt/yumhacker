class Api::GeolocationsController < ApplicationController
    respond_to :json

    include Geocoder
    include GooglePlaces

    def index
        query = params[:query]
        if query && !query.strip.empty?
            @geolocations = geocode(query)
        else
          render :json => []
        end
    end

    def details
        reference = params[:reference]
        if reference && !reference.strip.empty?
            details = google_places_details(reference)
            render :json => details.to_json
        else
          render :json => []
        end
    end
end