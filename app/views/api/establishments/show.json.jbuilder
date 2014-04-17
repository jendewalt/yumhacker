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
json.preview_photo @establishment.photos.last.image.url(:small) if @establishment.photos.length > 0
json.photos_path '/' + @establishment.path + '/photos'
json.hours @establishment.hours

json.lat @establishment.latlng.lat
json.lng @establishment.latlng.lon

json.categories @establishment.categories do |category|
    json.name category.name
    json.id category.id
end

json.hours @establishment.hours do |hour|
    json.open_day hour.open_day
    json.open_time hour.formatted_open_time
    json.close_day hour.close_day
    json.close_time hour.formatted_close_time
    json.open_in_minutes hour.open_in_minutes
end

json.wish_list_id current_user.try(:wish_lists).try(:first).try(:id)
json.wish_listed current_user ? current_user.wish_listed?(@establishment.id) : false
