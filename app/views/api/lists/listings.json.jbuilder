json.listings @listings do |listing|
    json.path listing.establishment.path
    json.id listing.establishment.id
    json.name listing.establishment.name
    json.street_number listing.establishment.street_number
    json.street listing.establishment.street
    json.city listing.establishment.city
    json.state listing.establishment.state
    json.lat listing.establishment.latlng.lat
    json.lng listing.establishment.latlng.lon

    unless listing.comment.nil? 
        json.comment do 
            json.id listing.comment.id
            json.body listing.comment.body
            json.created_at listing.comment.created_at
        end
    end

    json.user_endorsing current_user ? current_user.endorsing?(listing) : false
end