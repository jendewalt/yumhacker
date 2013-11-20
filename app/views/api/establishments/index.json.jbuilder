json.establishments @establishments do |establishment|
	json.id establishment.id
	json.name establishment.name
    json.formatted_address establishment.formatted_address
    json.street_number establishment.street_number
    json.street establishment.street
    json.phone establishment.phone
    json.website establishment.website
    json.price establishment.price
    json.lat establishment.latlng.lat
	json.lng establishment.latlng.lon
end
