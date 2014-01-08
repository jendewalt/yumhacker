UsersFindFacebookFriendsView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();
		this.collection = new UserFacebookFriendsCollection();

		this.user_facebook_friends_list_view = new UsersFacebookFriendsListView({
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
		this.$el.html(render('users/find_facebook_friends'));	
	}
});
