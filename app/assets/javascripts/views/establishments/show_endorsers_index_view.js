EstablishmentsShowEndorsersIndexView = Backbone.View.extend({
	
	initialize: function () {
		this.collection = new EndorsersCollection();

        this.establishments_show_endorsers_list_view = new EstablishmentsShowEndorsersListView({
            el: '#endorsers_list',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container.endorsers',
            collection: this.collection
        });
    },

    render: function () {
    }
});
