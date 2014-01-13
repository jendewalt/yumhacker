UsersSignUpFindFacebookFriendsView = Backbone.View.extend({
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
		
		if (!CurrentUser.get('id')) {
			this.authentication_options_view = new AuthenticationOptionsView({
	            el: '#login_modal_container'
	        });			
		}
	},

	render: function () {
		this.$el.html(render('users/sign_up_find_facebook_friends'));	
	},

	goToHome: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
