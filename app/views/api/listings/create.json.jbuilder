json.listing_id @listing.id
json.path @listing.establishment.path
json.id @listing.establishment.id
json.name @listing.establishment.name
json.street_number @listing.establishment.street_number
json.street @listing.establishment.street
json.city @listing.establishment.city
json.state @listing.establishment.state
json.lat @listing.establishment.latlng.lat
json.lng @listing.establishment.latlng.lon

unless @listing.comments.empty? 
    json.comment do 
        comment = @listing.comments.first
        json.id comment.id
        json.body comment.body
        json.created_at comment.created_at
    end
end

json.categories @listing.establishment.categories do |category|
    json.name category.name
    json.id category.id
end

json.user_endorsing current_user ? current_user.endorsing?(@listing.establishment) : false
json.user_wish_listed current_user ? current_user.wish_listed?(@listing.establishment) : false
