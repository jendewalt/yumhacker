Listing = Backbone.Model.extend({
    urlRoot: '/api/listings',

    type: 'Listing',

    initialize: function () {
        this.assignCategories();
        this.setFormattedAttributes();
        this.assignUrl(this.get('list_id'));

        this.on('sync', this.assignCategories);
        this.on('sync', this.setFormattedAttributes);        
    },

    assignCategories: function () {
        this.categories = new CategoriesCollection(this.get('categories'));
    },

    assignUrl: function (id) {
        this.urlRoot = '/api/lists/' + id + '/listings';
    },

    setFormattedAttributes: function () {
        if (this.get('price')) {
            var price_symbol = '';
            _.each(_.range(this.get('price')), function (num) {
                price_symbol += '$';
            });

            this.set('price_symbol', price_symbol);
        }

        if (this.get('website')) {
            var formatted_url = this.get('website').replace(/\/$/, '').replace(/^http.*\/\//, '').replace(/^www[.]/, '');
            this.set('formatted_url', formatted_url);
        } else {
            this.set('formatted_url', '');
            this.set('website', '');
        }
    }
});