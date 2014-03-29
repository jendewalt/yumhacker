UsersShowListView = Backbone.View.extend({
	events: {
		'click .nav': 'navigate'
	},

	initialize: function () {
		this.render();

		this.favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('.favorite_btn_container'),
            list: this.model 
        });			
	},

	render: function () {
		var desc = this.model.get('description');
		console.log(this.model.get('description'));
		xxx = this.model
		if (desc !== null && desc.length > 105) {
			this.model.set('description', desc.slice(0, 105) + '...');
		}
		this.$el.html(render('users/show_index_list', this.model));	
	},

	navigate: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
