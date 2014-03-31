json.current_page @comments.current_page
json.per_page @comments.limit_value
json.total_pages @comments.total_pages
json.offset @comments.offset_value
json.total @comments.total_count

json.comments @comments do |comment|
    json.id comment.id
    json.body comment.body
    json.user_id comment.user_id
    json.user_path comment.user.path
    json.full_name comment.user.first_name + ' ' + comment.user.last_name
    json.updated_at comment.updated_at
    json.thumb_url comment.user.avatar.url(:thumb)      
end