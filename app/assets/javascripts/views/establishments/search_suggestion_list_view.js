EstablishmentsSearchSuggestionListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'request', this.showThrobber);
	},

	render: function () {
		this.$el.html('');	


		if (!this.collection.isEmpty()) {
			this.$el.html(render('establishments/search_suggestion_list'));

	    	this.collection.each(function (establishment) {
				this.renderEstablishment(establishment);
			}, this);	
		} else {
			this.$el.html(render('application/no_results'));			
		}
	},

	renderEstablishment: function (establishment) {
		var establishment_view = new EstablishmentsSearchEstablishmentView({
			tagName: 'li',
			model: establishment
		});

		this.$('ul').append(establishment_view.el);
	},

	showThrobber: function () {
		this.$el.html(render('application/throbber_small'));
	}
});
