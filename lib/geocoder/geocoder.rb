module Geocoder
    require 'rest_client'

    def geocode(query)
        url = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address=%s&sensor=false" % CGI::escape(query)
        # url = "http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % CGI::escape(query)
        data = JSON.parse(RestClient.get url, :accept => :json).with_indifferent_access
        results = []
        data[:results].each do |address|
            result = {}
            result[:formatted_address] = address[:formatted_address] if address[:formatted_address]
            result[:lat] = address[:geometry][:location][:lat] if address[:geometry][:location][:lat]
            result[:lng] = address[:geometry][:location][:lng] if address[:geometry][:location][:lng]
            address[:address_components].each do |component|
                types = component[:types]
                key = case 
                when types.include?('street_number')
                    :street_number
                when types.include?('route')
                    :street
                when types.include?('neighborhood')
                    :neighborhood
                when types.include?('locality')
                    :city
                when types.include?('administrative_area_level_1')
                    :state
                when types.include?('country')
                    :country
                when types.include?('postal_code')
                    :zip_code
                end
                result[key] = component[:short_name] if key
            end
            results.push result.with_indifferent_access
        end
        results
    end
end