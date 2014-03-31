EstablishmentsShowListsContainerView = Backbone.View.extend({
	
	initialize: function () {
        this.collection = new ListsCollection();
        this.collection.where = { listings: { establishment_id: this.model.get('id') }};
        this.collection.order = { updated_at: 'desc' };

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
