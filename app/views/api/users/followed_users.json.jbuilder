json.followed_users @followed_users do |followed|
    json.id followed.id
    json.first_name followed.first_name
    json.last_name followed.last_name
end