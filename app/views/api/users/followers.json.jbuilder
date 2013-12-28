json.followers @followers do |follower|
    json.id follower.id
    json.first_name follower.first_name
    json.last_name follower.last_name
    json.full_name follower.first_name + ' ' + follower.last_name
    json.following current_user ? current_user.following?(follower) : false
end