UsersSearchSuggestionListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html('');

		if (!this.collection.isEmpty()) {
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
	}
});
