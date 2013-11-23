EstablishmentsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click .biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('establishments/index_establishment', this.model));	
	},

	goToEstablishmentShow: function (e) {
		e.preventDefault();
		App.navigate('establishments/' + this.model.get('id'), { trigger: true });
	}
});
