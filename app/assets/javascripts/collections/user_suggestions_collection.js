UserSuggestionsCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users/search',

    parse: function (response) {
        return response.users;
    }
});