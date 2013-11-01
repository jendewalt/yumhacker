FollowedUserCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users',

    initialize: function (models, id) {
        if (id) {
            this.fetchById(id);
        }
    },

    parse: function (response) {
        return response.followed_users;
    },

    fetchById: function (id) {
        var baseUrl = this.url;

        this.url += '/' + id;
        this.fetch({ rest: true });

        this.url = baseUrl;
    }
});
