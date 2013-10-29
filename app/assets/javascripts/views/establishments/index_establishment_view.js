EstablishmentsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click': 'goToEstablishmentShow'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('establishments/index_establishment', this.model));	
	},

	goToEstablishmentShow: function () {
		App.navigate('establishments/' + this.model.get('id'), { trigger: true });
	}
});
