json.users @users do |user|
	json.id user.id
    json.first_name user.first_name
    json.last_name user.last_name
    json.full_name user.full_name
    json.path user.path
    json.avatar_url_thumb user.avatar.url(:thumb)
    json.avatar_url_small user.avatar.url(:small)
    json.avatar_url_medium user.avatar.url(:medium)
    json.following current_user ? current_user.following?(user) : false
end