EstablishmentsShowEstablishmentInfoView = Backbone.View.extend({
    events: {},
	
	initialize: function () {
		this.render();

        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment_id: this.model.get('id') 
        });
        
        this.establishment_show_establishment_info_photo_view = new EstablishmentShowEstablishmentInfoPhotoView({
            el: '#establishment_photos_container',
            model: this.model
        });
    },

    render: function () {
        if (this.model.get('price')) {
            var price_symbol = '';
            _.each(_.range(this.model.get('price')), function (num) {
                price_symbol += '$';
            });

            this.model.set('price_symbol', price_symbol);
        }

        this.$el.html(render('establishments/show_establishment_info', this.model));
	}
});
