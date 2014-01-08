json.friends @friends do |friend|
    json.id friend.id
    json.first_name friend.first_name
    json.last_name friend.last_name
    json.full_name friend.first_name + ' ' + friend.last_name
    json.path friend.path
    json.avatar_url_thumb friend.avatar.url(:thumb)
    json.avatar_url_small friend.avatar.url(:small)
    json.avatar_url_medium friend.avatar.url(:medium)
    json.following current_user ? current_user.following?(friend) : false
end
