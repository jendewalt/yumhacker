Listing = Backbone.Model.extend({
    urlRoot: '/api/listings',

    type: 'Listing',

    initialize: function () {
        this.assignCategories();
        this.assignUrl(this.get('list_id'));
        this.on('sync', this.assignCategories);
    },

    assignCategories: function () {
        this.categories = new CategoriesCollection(this.get('categories'));
    },

    assignUrl: function (id) {
        this.urlRoot = '/api/lists/' + id + '/listings';
    }
});