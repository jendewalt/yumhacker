json.id @user.id
json.first_name @user.first_name
json.last_name @user.last_name
json.num_followers @user.followers.count
json.num_followed_users @user.followed_users.count
json.num_endorsements @user.endorsements.count
json.avatar_url_medium @user.avatar.url(:medium)
json.avatar_url_thumb @user.avatar.url(:thumb)