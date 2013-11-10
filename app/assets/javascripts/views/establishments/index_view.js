EstablishmentsIndexView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.collection = new EstablishmentCollection();
		// Need to pass latlng here like .fetch({data: {lat: 234, lng: 532}, reset: true})
		this.collection.fetch({ reset: true });
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html(render('establishments/index'));
		
		this.establishments_index_list_view = new EstablishmentsIndexListView({
			el: '.establishments_list',
			collection: this.collection
		});
	}
});
