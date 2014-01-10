json.current_page @followed_users.current_page
json.per_page @followed_users.limit_value
json.total_pages @followed_users.total_pages
json.offset @followed_users.offset_value
json.total @followed_users.total_count

json.followed_users @followed_users do |followed|
    json.id followed.id
    json.first_name followed.first_name
    json.last_name followed.last_name
    json.full_name followed.first_name + ' ' + followed.last_name
    json.path followed.path
    json.avatar_url_thumb followed.avatar.url(:thumb)
    json.avatar_url_small followed.avatar.url(:small)
    json.avatar_url_medium followed.avatar.url(:medium)
    json.following current_user ? current_user.following?(followed) : false
end