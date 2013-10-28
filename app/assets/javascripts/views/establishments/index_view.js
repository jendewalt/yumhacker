EstablishmentsIndexView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.collection = new EstablishmentCollection();
		this.collection.fetch({ reset: true });

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html('');
		this.collection.each(function (establishment) {
			this.$el.append(render('establishments/index', establishment));	
		}, this);
	}
});
