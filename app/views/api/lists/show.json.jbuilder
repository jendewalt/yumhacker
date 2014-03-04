json.id @list.id
json.title @list.title
json.description @list.description
json.user_id @list.user_id
json.user_full_name @list.user.first_name + ' ' + @list.user.last_name
json.user_thumb_url @list.user.avatar.url(:thumb)
json.user_path @list.user.path
json.created_at @list.created_at

json.user_favoriting current_user ? current_user.favoriting?(@list) : false
