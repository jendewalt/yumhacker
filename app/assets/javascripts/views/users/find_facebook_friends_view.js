UsersFindFacebookFriendsView = Backbone.View.extend({
	events: {
		'click .nav': 'goToHome'
	},

	initialize: function () {
		this.render();
		this.collection = new UserFacebookFriendsCollection();

		this.user_facebook_friends_list_view = new UsersFacebookFriendsListView({
			el: '#find_user_results_container',
			collection: this.collection
		});
	},

	render: function () {
		this.$el.html(render('users/find_facebook_friends'));	
	},

	goToHome: function (e) {
		e.preventDefault();
		App.navigate('/' + e.target.search, { trigger: true });
	}
});
