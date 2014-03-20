json.current_page @endorsers.current_page
json.per_page @endorsers.limit_value
json.total_pages @endorsers.total_pages
json.offset @endorsers.offset_value
json.total @endorsers.total_count

json.endorsers @endorsers do |user|
    json.id user.id
    json.full_name user.full_name
    json.avatar_url_thumb user.avatar.url(:thumb)
    json.path user.path
    json.following current_user ? current_user.following?(user) : false
end