FollowerCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users',

    initialize: function (models, id) {
        if (id) {
            this.fetchById(id);
        }
    },

    fetchById: function (id) {
        var baseUrl = this.url;

        this.url += '/' + id + '/followers';
        this.fetch({ rest: true });

        this.url = baseUrl;
    },

    parse: function (response) {
        return response.followers;
    },
});
