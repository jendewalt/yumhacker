json.comments @comments do |comment|
    json.user_id comment.user_id
    json.body comment.body
    json.created_at comment.created_at
    json.id comment.id
end