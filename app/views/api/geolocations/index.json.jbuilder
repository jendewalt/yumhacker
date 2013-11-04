json.array! @geolocations do |geolocation|

    json.formatted_address geolocation[:formatted_address]
    json.lat geolocation[:lat]
    json.lng geolocation[:lng]
    json.street_number geolocation[:street_number]
    json.street geolocation[:street]
    json.neighborhood geolocation[:neighborhood]
    json.city geolocation[:city]
    json.state geolocation[:state]
    json.country geolocation[:country]
    json.zip_code geolocation[:zip_code]
end