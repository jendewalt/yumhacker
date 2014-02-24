EstablishmentsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click .biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
		this.render();

		this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment: this.model 
        });	

        this.hours_view = new EstablishmentsIndexEstablishmentHoursView({ 
            el: this.$('.hours_container'),
            collection: this.model.hours 
        }); 

        this.categories_view = new EstablishmentsIndexEstablishmentCategoriesView({ 
            el: this.$('.categories_container'),
            collection: this.model.categories 
        }); 

        this.followed_endorsers_list = new FollowedEndorsersListView({ 
            el: this.$('.endorsers_wrapper'),
            model: this.model
        });              
	},

	render: function () {
		this.$el.html(render('establishments/index_establishment', this.model));	
	},

	goToEstablishmentShow: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
