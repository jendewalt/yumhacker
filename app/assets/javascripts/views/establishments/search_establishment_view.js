EstablishmentsSearchEstablishmentView = Backbone.View.extend({
	events: {
		'click .create_btn': 'create'
	},

	initialize: function () {
		this.render();
		this.listenTo(this.model, 'sync', this.render);
	},

	render: function () {
		this.$el.html(render('establishments/search_establishment', this.model));

		if (this.model.get('id')) {
			this.application_wish_list_button_view = new ApplicationWishListButtonView({ 
	            el: this.$('.wish_list_btn_container'),
	            model: this.model
	        }); 

	        this.add_to_list_button_view = new ApplicationAddToListButtonView({ 
	            el: this.$('.add_to_list_btn_container'),
	            model: this.model
	        });	
		}
	},

	create: function (e) {
		var action = e.currentTarget.dataset.action; // 'wish_list' or 'add_to_list'
		if (CurrentUser.logged_in()) {
			if (action == 'wish_list') {
				this.model.save({}, { success: $.proxy(this.wishList, this) });
			} else {
				this.model.save({}, { success: $.proxy(this.addToList, this) });
			}
		} else  {
			CurrentUser.authenticate();
		}
	},

	wishList: function (mod, res) {
		// TODO: Refactor this nuttiness
		this.new_wish_list_listing = new Listing({
			url: '/api/lists/' + this.model.get('wish_list_id') + '/listings/',
            establishment_id: this.model.get('id'),
            list_id: this.model.get('wish_list_id')
		});

		this.model.set('wish_listed', true);
		this.new_wish_list_listing.save();
	},

	addToList: function (mod, res) {
		// TODO: Refactor this nuttiness
		if (CurrentUser.logged_in()) {
            ModalView.show(new ListsAddToListModalView({ 
                el: '#inner_modal_content',
                model: this.model
            }));   
        } else {
            CurrentUser.authenticate();
        }   
	}
});
