json.id @user.id
json.full_name @user.first_name + ' ' + @user.last_name
json.first_name @user.first_name 
json.last_name @user.last_name
json.location @user.location
json.website @user.website
json.description @user.description

json.tabs_data ({
    lists: {
        name: 'Yum Lists',
        url: '/'+ @user.path + '/lists',
        count: @user.lists.length
    },
    favorites: {
        name: 'Favorites',
        url: '/'+ @user.path + '/favorites',
        count: @user.favorite_lists.length
    },
    following: {
        name: 'Following',
        url: '/'+ @user.path + '/following',
        count: @user.followed_users.length
    },
    followers: {
        name: 'Followers',
        url: '/'+ @user.path + '/followers',
        count: @user.followers.length
    }
})


json.avatar_url_thumb @user.avatar.url(:thumb)
json.avatar_url_small @user.avatar.url(:small)
json.avatar_url_medium @user.avatar.url(:medium)
json.path @user.path
json.following current_user ? current_user.following?(@user) : false
