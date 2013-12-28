json.users @users do |user|
	json.id user.id
    json.first_name user.first_name
    json.last_name user.last_name
    json.full_name user.first_name + ' ' + user.last_name
    json.following current_user ? current_user.following?(user) : false
end