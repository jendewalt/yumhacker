MainIndexView = Backbone.View.extend({
	events: {
		'click a': 'goToEstablishmentsIndex'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index'));
	},

	goToEstablishmentsIndex: function (e) {
		e.preventDefault();
		xxx = e
		App.navigate(e.target.pathname, { trigger: true });
	}
});
