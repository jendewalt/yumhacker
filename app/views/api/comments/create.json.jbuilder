json.id @comment.id
json.body @comment.body
json.user_id @comment.user_id
json.establishment_id @comment.commentable_id
json.first_name @comment.user.first_name
json.last_name @comment.user.last_name
json.full_name @comment.user.full_name
json.updated_at @comment.updated_at

json.thumb_url @comment.user.avatar.url(:thumb)
