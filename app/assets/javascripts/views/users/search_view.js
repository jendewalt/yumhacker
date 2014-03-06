UsersSearchView = Backbone.View.extend({
	events: {
		'submit': 'searchForUsers',
		'click #find_friends_button': 'goToFindFbFriends'
	},

	title: 'Find Friends | YumHacker',

	description: 'Search for friends to find restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

	initialize: function () {
		this.render();
		
		App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);

		this.collection = new UserSuggestionCollection();

		this.user_search_suggestion_list_view = new UsersSearchSuggestionListView({
			el: '#find_user_results_container',
			collection: this.collection
		});
		
		if (!CurrentUser.get('id')) {
			this.authentication_options_view = new AuthenticationOptionsView({
	            el: '#login_modal_container'
	        });			
		}
	},

	render: function () {
		this.$el.html(render('users/search'));	
	},

	searchForUsers: function (e) {
		e.preventDefault();
		var query = e.target[0].value;
		this.collection.fetch({ reset: true, data: { query: query } });
	},

	goToFindFbFriends: function (e) {
		e.preventDefault();
		App.navigate(e.currentTarget.pathname, { trigger: true });
	}
});
