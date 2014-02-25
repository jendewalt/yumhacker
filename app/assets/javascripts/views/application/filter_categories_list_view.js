FilterCategoriesListView = Backbone.View.extend({
    events: {
        'change select': 'setCategoriesFilter',
    },
    
    initialize: function () {
        this.collection = new CategoriesCollection();
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true });
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/filter_categories_list'));

        this.collection.each(function (category) {
            this.renderCategory(category);            
        }, this);
    },

    renderCategory: function (category) {
        this.$('select').append(render('application/filter_categories_option', category));
    },

    setCategoriesFilter: function (e) {
        Filter.set('categories', $(e.target).val());
    }
});
