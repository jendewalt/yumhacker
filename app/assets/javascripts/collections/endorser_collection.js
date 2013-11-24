EndorsersCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/establishments/endorsers',

    parse: function (response) {
        return response.endorsers;
    },
});
