MainBtnContainerView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('main/btn_container'));	
	},

	goToSubIndex: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
