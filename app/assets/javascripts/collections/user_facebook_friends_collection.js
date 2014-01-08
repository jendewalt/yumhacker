UserFacebookFriendsCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users/find_facebook_friends',

    parse: function (response) {
        return response.friends;
    }
});