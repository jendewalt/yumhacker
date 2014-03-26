json.current_page @lists.current_page
json.per_page @lists.limit_value
json.total_pages @lists.total_pages
json.offset @lists.offset_value
json.total @lists.total_count

json.lists @lists do |list|
    json.id list.id
    json.title list.title
    json.path list.path

    if list.photos.last.nil?
        json.thumb_url '/no_photo.svg'
    else
        json.thumb_url list.photos.last.image.url(:thumb)
    end
    json.user_id list.user_id
    json.user_full_name list.user.full_name
    json.user_thumb_url list.user.avatar.url(:thumb)
    json.user_path list.user.path
end