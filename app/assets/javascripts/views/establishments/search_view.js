EstablishmentsSearchView = Backbone.View.extend({

	initialize: function () {
		this.render();
		this.collection = new EstablishmentSuggestionCollection();
		new EstablishmentsSearchSuggestionListView({
			el: 'ul.search_results',
			collection: this.collection
		});
	},

	render: function () {
		this.$el.html(render('establishments/search'));	
	},

	searchForEstablishments: function (e) {
		e.preventDefault();
		var query = e.target[0].value;
		var location = e.target[1].value;
		
		this.collection.fetch({ reset: true, data: { query: query, location: location } });
	}
});

// need to move this to a subview
// events: {
// 		'submit': 'searchForEstablishments'
// 	},