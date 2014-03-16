json.photos @photos do |photo|
    json.id photo.id
    json.user_id photo.user_id
    json.full_name photo.user.first_name + ' ' + photo.user.last_name
    json.first_name photo.user.first_name 
    json.last_name photo.user.last_name
    json.caption photo.caption
    json.thumb_url photo.image.url(:thumb)
    json.small_url photo.image.url(:small)
    json.medium_url photo.image.url(:medium)
    json.created_at photo.created_at
end