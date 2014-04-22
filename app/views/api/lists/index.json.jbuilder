json.current_page @lists.current_page
json.per_page @lists.limit_value
json.total_pages @lists.total_pages
json.offset @lists.offset_value
json.total @lists.total_count

json.lists @lists do |list|
    json.id list.id
    json.title list.title
    json.description list.description
    json.path list.path
    json.updated_at list.updated_at
    json.type list.type
    json.establishment_ids list.establishment_ids

    if list.photos.last.nil?
        json.small_url '/no_photo.svg'
    else
        json.small_url list.photos.last.image.url(:small)
    end

    json.user_id list.user_id
    json.user_full_name list.user.full_name
    json.user_thumb_url list.user.avatar.url(:thumb)
    json.user_path list.user.path
    json.user_location list.user.location

    json.user_favoriting current_user ? current_user.favoriting?(list) : false
end
