UsersSignUpFacebookFriendsListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'request', this.showThrobber);

		params = window.location.search.replace(/^\?code=/, '');

		if (params !== '') {
			this.collection.fetch({ reset: true, data: { code: params} });
		} else {
			this.collection.fetch({ reset: true });			
		}
	},

	render: function () {
		this.$el.html('');

		if (this.collection.models.length > 0 && this.collection.models[0].get('error')) {
			this.$el.html(render('users/access_token_login', this.collection.models[0].get('error')));
		} else if (!this.collection.isEmpty()) {
			this.$el.html(render('users/search_suggestion_list'));

	    	this.collection.each(function (user) {
				this.renderUser(user);
			}, this);			
		} else {
			this.$el.html(render('application/no_results'));			
		}
	},

	renderUser: function (user) {
		var user_view = new UsersIndexUserView({
			tagName: 'li',
			model: user
		});

		this.$('ul').append(user_view.el);
	},

	showThrobber: function () {
		this.$el.html(render('application/throbber_small'));
	}
});
