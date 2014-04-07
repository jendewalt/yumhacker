UsersShowListContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new ListsCollection();
        this.collection.where = { user_id: this.model.get('id') };
        this.collection.order = [{ type: 'desc'}, { updated_at: 'desc' }];

        this.listenTo(this.model, 'render:lists', this.fetchCollection);
        this.listenTo(this.collection, 'reset', this.render);
    },

    fetchCollection: function () {
        this.collection.fetch({ reset: true, data: this.collection.predicate() });
    },

    render: function () {
        this.$el.html(render('users/show_stuff'));

        this.list_index_list = new UsersShowListView({
            el: this.$('ul'),
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: this.$('.pagination_container'),
            collection: this.collection
        });
        this.pagination_view.render();
    }
});
