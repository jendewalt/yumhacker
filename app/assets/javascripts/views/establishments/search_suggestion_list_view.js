EstablishmentsSearchSuggestionListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html('');	

    	this.collection.each(function (establishment) {
			this.renderEstablishment(establishment);
		}, this);	
	},

	renderEstablishment: function (establishment) {
		var establishment_view = new EstablishmentsSearchEstablishmentView({
			tagName: 'li',
			model: establishment
		});

		this.$el.append(establishment_view.el);
	}
});
