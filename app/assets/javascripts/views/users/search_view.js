UsersSearchView = Backbone.View.extend({
	events: {
		'submit': 'searchForUsers'
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
		var email = e.target[0].value;
		var first_name = e.target[1].value;
		var last_name = e.target[2].value;

		this.collection.fetch({ reset: true, data: { email: email, first_name: first_name, last_name: last_name } });
	}
});
