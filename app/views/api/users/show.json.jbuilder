json.id @user.id
json.full_name @user.first_name + ' ' + @user.last_name
json.first_name @user.first_name 
json.last_name @user.last_name
json.location @user.location
json.num_followers @user.followers.count
json.num_followed_users @user.followed_users.count
json.num_endorsements @user.endorsements.count
json.avatar_url_thumb @user.avatar.url(:thumb)
json.avatar_url_small @user.avatar.url(:small)
json.avatar_url_medium @user.avatar.url(:medium)
json.path @user.path
json.following current_user ? current_user.following?(@user) : false
