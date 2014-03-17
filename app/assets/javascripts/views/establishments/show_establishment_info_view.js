 EstablishmentsShowEstablishmentInfoView = Backbone.View.extend({
    events: {},
	
	initialize: function () {
		this.render();

        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment: this.model 
        });
        
        this.establishment_show_establishment_info_photo_view = new EstablishmentShowPreviewPhotosContainerView({
            el: '#establishment_photos_container',
            model: this.model
        });

        this.establishment_show_establishment_categories_view = new EstablishmentsShowEstablishmentCategoriesView({
            el: '.categories_container',
            collection: this.model.categories
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
