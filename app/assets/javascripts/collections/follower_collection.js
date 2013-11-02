FollowersCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users/followers',

    parse: function (response) {
        return response.followers;
    },
});
