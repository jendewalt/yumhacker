json.comments @comments do |comment|
    json.id comment.id
    json.body comment.body
    json.user_id comment.user_id
    json.username comment.username
    json.establishment_id comment.establishment_id
    json.establishment_name comment.establishment_name
    json.created_at comment.created_at
end