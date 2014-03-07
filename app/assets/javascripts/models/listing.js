Listing = Backbone.Model.extend({
    urlRoot: '/api/listings',

    initialize: function () {
        this.assignCategories();
        this.on('sync', this.assignCategories);
    },

    assignCategories: function () {
        this.categories = new CategoriesCollection(this.get('categories'));
    },
});