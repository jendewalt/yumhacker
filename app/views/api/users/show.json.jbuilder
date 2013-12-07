json.id @user.id
json.first_name @user.first_name
json.last_name @user.last_name
json.num_followers @num_followers
json.num_followed_users @num_followed_users
json.num_endorsements @num_endorsements
json.avatar_url_medium @user.avatar.url(:medium)
json.avatar_url_thumb @user.avatar.url(:thumb)