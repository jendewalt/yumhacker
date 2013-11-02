FollowedUsersCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users/followed_users',

    parse: function (response) {
        return response.followed_users;
    }
});
