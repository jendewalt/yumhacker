UsersSearchSuggestionListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html('');	

    	this.collection.each(function (user) {
			this.renderUser(user);
		}, this);	
	},

	renderUser: function (user) {
		var user_view = new UsersSearchUserView({
			tagName: 'li',
			model: user
		});

		this.$el.append(user_view.el);
	}
});
