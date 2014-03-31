ListsIndexListView = Backbone.View.extend({
	events: {
		'click .nav': 'navigate'
	},

	initialize: function (options) {
		this.render();

		this.favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('.favorite_btn_container'),
            list: this.model 
        });			
	},

	render: function () {
		this.$el.html(render('lists/index_list', this.model));	
	},

	navigate: function (e) {
		e.preventDefault();
		App.navigate(e.currentTarget.pathname, { trigger: true });
	}
});
