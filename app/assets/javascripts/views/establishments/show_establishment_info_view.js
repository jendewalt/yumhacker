EstablishmentsShowEstablishmentInfoView = Backbone.View.extend({
    events: {},
	
	initialize: function () {
		this.render();

        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment: this.model 
        });
        
        this.establishment_show_establishment_info_photo_view = new EstablishmentShowEstablishmentInfoPhotoView({
            el: '#establishment_photos_container',
            model: this.model
        });
        
        this.hours_view = new EstablishmentsShowEstablishmentHoursView({ 
            el: this.$('.hours_container'),
            collection: this.model.hours 
        });     
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_info', this.model));
	}
});
