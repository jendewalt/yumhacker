json.photos @photos do |photo|
    json.id photo.id
    json.establishment_id photo.establishment_id
    json.thumb_url photo.image.url(:thumb)
end