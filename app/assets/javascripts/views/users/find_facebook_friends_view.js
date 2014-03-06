UsersFindFacebookFriendsView = Backbone.View.extend({
	events: {
		'click .nav': 'goToHome'
	},

	title: 'Find Facebook Friends | YumHacker',

	description: 'Connect with your Facebook friends to find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

	initialize: function () {
		this.render();

		App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);

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
	},

	goToHome: function (e) {
		e.preventDefault();
		App.navigate('/' + e.target.search, { trigger: true });
	}
});
