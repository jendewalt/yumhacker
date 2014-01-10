json.current_page @followers.current_page
json.per_page @followers.limit_value
json.total_pages @followers.total_pages
json.offset @followers.offset_value
json.total @followers.total_count

json.followers @followers do |follower|
    json.id follower.id
    json.first_name follower.first_name
    json.last_name follower.last_name
    json.full_name follower.first_name + ' ' + follower.last_name
    json.path follower.path
    json.avatar_url_thumb follower.avatar.url(:thumb)
    json.avatar_url_small follower.avatar.url(:small)
    json.avatar_url_medium follower.avatar.url(:medium)
    json.following current_user ? current_user.following?(follower) : false
end