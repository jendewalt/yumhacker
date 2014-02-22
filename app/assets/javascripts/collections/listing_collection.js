ListingsCollection = Backbone.Collection.extend({
    model: Listing,

    parse: function (res) {
        return res.listings;
    }
});
