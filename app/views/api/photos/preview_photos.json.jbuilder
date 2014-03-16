json.photos @photos do |photo|
    json.id photo.id
    json.thumb_url photo.image.url(:thumb)
end