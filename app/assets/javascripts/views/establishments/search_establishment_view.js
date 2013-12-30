EstablishmentsSearchEstablishmentView = Backbone.View.extend({
	events: {
		'click .create_btn': 'create'
	},

	initialize: function () {
		this.render();
		this.listenTo(this.model, 'sync', this.goToEstablishmentShow);
	},

	render: function () {
		this.$el.html(render('establishments/search_establishment', this.model));	
	},

	create: function () {
		this.model.save();
	},
	
	goToEstablishmentShow: function () {
		App.navigate(this.model.get('path'), { trigger: true });              
    }
});
