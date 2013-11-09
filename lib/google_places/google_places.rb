module GooglePlaces
    require 'rest_client'

    def google_places(query, lat, lng)

        api_key = YAML.load_file('config/config.yml')['google_places_api_key']
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=%s&location=%s,%s&radius=20000&types=restaurant&sensor=false&key=%s" % [CGI::escape(query), lat, lng, api_key]
        data = JSON.parse(RestClient.get url, :accept => :json).with_indifferent_access
        results = []
        data[:results].each do |place|
            result = {}
            result[:formatted_address] = place[:vicinity] if place[:vicinity]
            result[:lng] = place[:geometry][:location][:lng] if place[:geometry][:location][:lng]
            result[:lat] = place[:geometry][:location][:lat] if place[:geometry][:location][:lat]
            result[:name] = place[:name] if place[:name]
            result[:price] = place[:price_level] if place[:price_level]
            result[:reference] = place[:reference] if place[:reference]
            result[:google_id] = place[:id] if place[:id]
            results.push result.with_indifferent_access
        end
        results
    end

    def google_places_details(reference)
        api_key = YAML.load_file('config/config.yml')['google_places_api_key']
        url = "https://maps.googleapis.com/maps/api/place/details/json?reference=%s&sensor=false&key=%s" % [reference, api_key]
        data = JSON.parse(RestClient.get url, :accept => :json).with_indifferent_access
        location = data[:result]
        result = {}
        result[:formatted_address] = location[:formatted_address] if location[:formatted_address]
        result[:phone] = location[:international_phone_number] if location[:international_phone_number]
        result[:website] = location[:website] if location[:website]
        location[:address_components].each do |component|
            types = component[:types]
            key = case 
            when types.include?('street_number')
                :street_number
            when types.include?('route')
                :street
            when types.include?('sublocality')
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

        result[:hours] = []
        unless location[:opening_hours].nil?
            location[:opening_hours][:periods].each do |period|
                result[:hours].push({ event_type: 'close', day: period[:close][:day], time: period[:close][:time] })
                result[:hours].push({ event_type: 'open', day: period[:open][:day], time: period[:open][:time] })
            end
        end
        result
    end
end