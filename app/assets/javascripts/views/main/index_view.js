MainIndexView = Backbone.View.extend({
	events: {
		'click': 'goToEstablishmentsIndex'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index', { name: 'jen' }));
	},

	goToEstablishmentsIndex: function () {
		App.navigate('establishments', {trigger: true});
	}
});
