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

		if (!CurrentUser.get('id')) {
            this.authentication_options_view = new AuthenticationOptionsView({
                el: '#login_modal_container'
            });         
        }

		this.listenTo(EstablishmentSearch, 'geocode', this.fetchResults);
		this.listenTo(EstablishmentSearch, 'error', this.showError);
	},

	render: function () {
		this.$el.html(render('establishments/search'));
	},

	searchForEstablishments: function (e) {
		e.preventDefault();
		this.query = e.target[0].value;
		var location = e.target[1].value;
		EstablishmentSearch.geocode(e.target[1].value);
		this.$('#find_establishment_results_container').html(render('application/throbber_small'));
	},

	fetchResults: function () {
		this.collection.fetch({
			reset: true,
			data: _.extend(EstablishmentSearch.predicate(), { query: this.query })
		});
	},

	showError: function () {
		this.$('#find_establishment_results_container').html(render('application/geocode_error'));
	}
});
