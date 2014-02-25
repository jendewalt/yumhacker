CategoriesCollection = Backbone.Collection.extend({
    model: Category,

    url: 'api/categories',

    parse: function (res) {
        return res.categories
    }
});
