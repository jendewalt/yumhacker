json.id @comment.id
json.body @comment.body
json.user_id @comment.user_id
json.establishment_id @comment.establishment_id
json.first_name @comment.user.first_name
json.last_name @comment.user.last_name
json.establishment_name @comment.establishment.name
json.created_at @comment.created_at

json.thumb_url @comment.user.avatar.url(:thumb)
json.small_url @comment.user.avatar.url(:small)
json.medium_url @comment.user.avatar.url(:medium)