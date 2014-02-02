json.establishments @establishments do |establishment|
    json.name establishment[:name]
    json.formatted_address establishment[:formatted_address]
    json.lat establishment[:lat]
    json.lng establishment[:lng]
    json.price establishment[:price]
    json.reference establishment[:reference]
    json.google_id establishment[:google_id]

    json.path establishment.path if establishment[:slug] 
    json.id establishment[:id]

    if establishment[:reference] == nil
        json.user_endorsing current_user ? current_user.endorsing?(establishment) : false
    else
        json.user_endorsing false
    end
end