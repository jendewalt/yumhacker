UsersSearchUserView = Backbone.View.extend({
	events: {
		'click .user_name': 'goToUserShow'
	},

	initialize: function () {
		this.render();

		this.application_follow_button_view = new ApplicationFollowButtonView({ 
            el: this.$('.follow_btn_container'),
            user_id: this.model.get('id') 
        });

		this.listenTo(this.model, 'sync', this.goToUserShow);
	},

	render: function () {
		this.$el.html(render('users/search_user', this.model));	
	},

	goToUserShow: function () {
		App.navigate('users/' + this.model.get('id'), { trigger: true });		
	}
});
