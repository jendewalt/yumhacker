EstablishmentsSearchView = Backbone.View.extend({
	events: {
		'submit': 'searchForEstablishments'
	},

	initialize: function () {
		this.render();
		this.collection = new EstablishmentSuggestionCollection();
		this.establishment_search_suggestion_list_view = new EstablishmentsSearchSuggestionListView({
			el: '#find_establishment_results_container',
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
