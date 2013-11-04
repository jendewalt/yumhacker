EstablishmentSuggestionCollection = Backbone.Collection.extend({
    model: Establishment,

    url: '/api/establishments/search',

    parse: function (response) {
        return response.establishments;
    }
});