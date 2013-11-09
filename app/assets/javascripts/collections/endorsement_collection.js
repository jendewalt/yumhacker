EndorsementCollection = Backbone.Collection.extend({
    model: Establishment,

    url: '/api/users/endorsements',

    parse: function (response) {
        return response.establishments;
    },
});
