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

    json.wish_list_id current_user.try(:wish_lists).try(:first).try(:id)

    if establishment[:id].nil?
        json.wish_listed false
    else
        json.wish_listed current_user ? current_user.wish_listed?(establishment.id) : false
    end

end