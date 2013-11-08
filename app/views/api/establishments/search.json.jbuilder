json.establishments @establishments do |establishment|

    json.name establishment[:name]
    json.formatted_address establishment[:formatted_address]
    json.lat establishment[:lat]
    json.lng establishment[:lng]
    json.price establishment[:price]
    json.reference establishment[:reference]
    json.google_id establishment[:google_id]
end