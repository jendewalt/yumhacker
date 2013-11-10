MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index', CurrentUser));

		this.main_index_map_view = new MainIndexMapView({
			el: '.map_canvas_container'
		});
	},

	goToSubIndex: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
