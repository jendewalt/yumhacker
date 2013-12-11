json.photos @photos do |photo|
    json.id photo.id
    json.establishment_id photo.establishment_id
    json.establishment_name photo.establishment.name
    json.user_id photo.user_id
    json.username photo.user.first_name + ' ' + photo.user.last_name
    json.caption photo.caption
    json.thumb_url photo.image.url(:thumb)
    json.small_url photo.image.url(:small)
    json.medium_url photo.image.url(:medium)
end