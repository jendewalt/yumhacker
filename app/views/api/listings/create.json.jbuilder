json.id @listing.id
json.path @listing.establishment.path
json.establishment_id @listing.establishment.id
json.name @listing.establishment.name
json.street_number @listing.establishment.street_number
json.street @listing.establishment.street
json.city @listing.establishment.city
json.state @listing.establishment.state
json.lat @listing.establishment.latlng.lat
json.lng @listing.establishment.latlng.lon
json.created_at @listing.created_at

unless @listing.comments.empty? 
    json.comment do 
        comment = @listing.comments.first
        json.id comment.id
        json.body comment.body
        json.updated_at comment.updated_at
    end
end

json.categories @listing.establishment.categories do |category|
    json.name category.name
    json.id category.id
end

json.wish_listed current_user ? current_user.wish_listed?(@listing.establishment.id) : false
