json.followers @followers do |follower|
    json.id follower.id
    json.first_name follower.first_name
    json.last_name follower.last_name
end