ListCollection = Backbone.Collection.extend({
    model: Listing,

    url: '/api/lists',
});
