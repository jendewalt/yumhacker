json.followed_users @followed_users do |followed|
    json.id followed.id
    json.name followed.name
end