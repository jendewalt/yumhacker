json.id @establishment.id
json.name @establishment.name
json.formatted_address @establishment.formatted_address
json.street_number @establishment.street_number
json.street @establishment.street
json.city @establishment.city
json.state @establishment.state
json.zip_code @establishment.zip_code
json.phone @establishment.phone
json.website @establishment.website
json.price @establishment.price
json.neighborhood @establishment.neighborhood
json.path @establishment.path
json.photos_path '/' + @establishment.path + '/photos'
json.hours @establishment.hours

json.lat @establishment.latlng.lat
json.lng @establishment.latlng.lon

json.user_endorsing current_user ? current_user.endorsing?(@establishment) : false