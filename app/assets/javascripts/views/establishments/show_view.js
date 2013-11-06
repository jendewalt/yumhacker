EstablishmentsShowView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
	},

	render: function () {
		this.$el.html(render('establishments/show', this.model));
        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment_id: this.model.get('id') 
        });
	}
});
