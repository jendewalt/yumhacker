json.listings @listings do |listing|
    json.path listing.path
    json.id listing.id
    json.name listing.name
    json.street_number listing.street_number
    json.street listing.street
    json.city listing.city
    json.state listing.state
    json.lat listing.latlng.lat
    json.lng listing.latlng.lon

    json.user_endorsing current_user ? current_user.endorsing?(listing) : false
end