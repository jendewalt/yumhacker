EndorsementsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click .biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
		this.render();

		this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment: this.model 
        });			
	},

	render: function () {
		this.$el.html(render('endorsements/index_establishment', this.model));	
	},

	goToEstablishmentShow: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
