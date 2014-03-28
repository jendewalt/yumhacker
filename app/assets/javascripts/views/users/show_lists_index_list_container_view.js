UsersShowListsIndexListContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new ListsCollection();
        this.collection.assignUrl(this.model.get('id'));
        this.render();
    },

    render: function () {
        this.$el.html(render('users/show_lists_index_list_container', this.model));

        this.list_index_list = new UsersShowListsIndexListView({
            el: 'ul.lists',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
    }
});
