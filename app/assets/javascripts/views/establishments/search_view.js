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

		this.listenTo(EstablishmentSearch, 'change', this.fetchResults);
	},

	render: function () {
		this.$el.html(render('establishments/search'));
	},

	searchForEstablishments: function (e) {
		e.preventDefault();
		this.query = e.target[0].value;
		var location = e.target[1].value;
		EstablishmentSearch.geocode(e.target[1].value);
	},

	fetchResults: function () {
		this.collection.fetch({
			reset: true,
			data: _.extend(EstablishmentSearch.predicate(), { query: this.query })
		});
	}
});
