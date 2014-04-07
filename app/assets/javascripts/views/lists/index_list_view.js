ListsIndexListView = Backbone.View.extend({
	events: {
		'click .nav': 'navigate'
	},

	initialize: function () {
		this.render();

		this.favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('.favorite_btn_container'),
            model: new FavoriteButton({
                'list_id': this.model.get('id'), 
                'user_favoriting': this.model.get('user_favoriting'), 
                'number_favorites': this.model.get('number_favorites') 
            })
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
