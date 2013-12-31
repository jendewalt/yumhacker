json.endorsers @establishment.users do |user|
    json.id user.id
    json.full_name user.first_name + ' ' + user.last_name
    json.avatar_url_thumb user.avatar.url(:thumb)
    json.path user.path
    json.following current_user ? current_user.following?(user) : false
end