EstablishmentsShowEstablishmentInfoView = Backbone.View.extend({
	
	initialize: function () {
		this.render();

        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment_id: this.model.get('id') 
        });
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_info', this.model));
	}
});
