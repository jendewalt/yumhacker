json.id @list.id
json.title @list.title
json.description @list.description
json.type @list.type
if @list.photos.last.nil?
    json.small_url '/no_photo.svg'
else
    json.small_url @list.photos.last.image.url(:small)
end
json.path @list.path
json.edit_path @list.edit_path
json.user_id @list.user_id
json.user_first_name @list.user.first_name
json.user_full_name @list.user.full_name
json.user_thumb_url @list.user.avatar.url(:thumb)
json.user_path @list.user.path
json.updated_at @list.updated_at

json.user_favoriting current_user ? current_user.favoriting?(@list) : false
