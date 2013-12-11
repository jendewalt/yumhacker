EstablishmentsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click .biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
		this.render();

		this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment_id: this.model.get('id') 
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

		this.$el.html(render('establishments/index_establishment', this.model));	
	},

	goToEstablishmentShow: function (e) {
		e.preventDefault();
		App.navigate('establishments/' + this.model.get('id'), { trigger: true });
	}
});
