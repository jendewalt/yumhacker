EstablishmentsSearchView = Backbone.View.extend({
	events: {
		'submit': 'searchForEstablishments'
	},

	title: 'Find a Restaurant | YumHacker',

	description: 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

	initialize: function () {
		this.render();

		App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);

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
