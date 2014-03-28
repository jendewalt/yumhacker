UsersShowListView = Backbone.View.extend({
	events: {
		'click .nav': 'navigate'
	},

	initialize: function () {
		this.render();

		// this.favorite_button_view = new ApplicationFavoriteButtonView({ 
  //           el: this.$('.favorite_btn_container'),
  //           establishment: this.model 
  //       });			
	},

	render: function () {
		this.$el.html(render('users/show_index_list', this.model));	
	},

	navigate: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
