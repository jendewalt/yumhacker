UsersSearchView = Backbone.View.extend({
	events: {
		'submit': 'searchForUsers',
		'click #find_friends_button': 'goToFindFbFriends'
	},

	initialize: function () {
		this.render();
		this.collection = new UserSuggestionCollection();

		this.user_search_suggestion_list_view = new UsersSearchSuggestionListView({
			el: '#find_user_results_container',
			collection: this.collection
		});
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
