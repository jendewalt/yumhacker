json.current_page @establishments.current_page
json.per_page @establishments.limit_value
json.total_pages @establishments.total_pages
json.offset @establishments.offset_value
json.total @establishments.total_count

json.establishments @establishments do |establishment|
    json.path establishment.path
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

    json.user_endorsing current_user ? current_user.endorsing?(establishment) : false
end
