json.followed_users @followed_users do |followed|
    json.id followed.id
    json.first_name followed.first_name
    json.last_name followed.last_name
    json.full_name followed_users.first_name + ' ' + followed_users.last_name
    json.following current_user ? current_user.following?(followed) : false
end