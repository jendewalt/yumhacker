ListingsCollection = Backbone.Collection.extend({
    model: Listing,

    parse: function (res) {
        return res.listings;
    },

    assignUrl: function (id) {
        this.url = '/api/lists/' + id + '/listings';
    }
});
