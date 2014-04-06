EstablishmentsIndexEstablishmentView = Backbone.View.extend({
	events: {
		'click .biz_name': 'navigate'
	},

	initialize: function () {
		this.render();

		this.application_wish_list_button_view = new ApplicationWishListButtonView({ 
            el: this.$('.wish_list_btn_container'),
            model: this.model
        }); 

        this.add_to_list_button_view = new ApplicationAddToListButtonView({ 
            el: this.$('.add_to_list_btn_container'),
            model: this.model
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

	navigate: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
