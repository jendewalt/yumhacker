json.establishments @establishments do |establishment|
	json.id establishment.id
	json.name establishment.name
    json.formatted_address establishment.formatted_address
    json.lat establishment.latlng.lat
	json.lng establishment.latlng.lon
end
