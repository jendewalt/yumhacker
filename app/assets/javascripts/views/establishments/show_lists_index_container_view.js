EstablishmentsShowListsContainerView = Backbone.View.extend({
	
	initialize: function () {
        this.collection = new ListsCollection();
        this.render();
    },

    render: function () {
        this.$el.html(render('establishments/show_lists_container', this.model));

        this.list_index_list = new EstablishmentsShowListsIndexListView({
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
