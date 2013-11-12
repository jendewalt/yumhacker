EndorsedEstablishmentCollection = Backbone.Collection.extend({
    model: Establishment,

    url: '/api/establishments',

    parse: function (response) {
        return response.establishments;
    }
});