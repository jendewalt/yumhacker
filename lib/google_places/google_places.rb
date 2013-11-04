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
            results.push result.with_indifferent_access
        end
        results
    end
end