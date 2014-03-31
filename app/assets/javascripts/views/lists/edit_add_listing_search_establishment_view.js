ListsEditAddListingSearchEstablishmentView = Backbone.View.extend({
    events: {
        'click .add_btn': 'addToList'
    },

    initialize: function () {
        if (EstablishmentSearch.listings.findWhere({ establishment_id: this.model.id }) !== undefined) {
            this.model.set('listed', true);
        } else {
            this.model.set('listed', false);            
        }

        this.render();
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('lists/edit_add_listing_search_establishment', this.model));
    },

    addToList: function () {
        if (CurrentUser.logged_in()) {
            if (this.model.get('id')) {
                this.createListing();
            } else {
                this.model.save({}, { success: $.proxy(this.createListing, this) });
            }
        } else  {
            CurrentUser.authenticate();
        }
    },

    createListing: function (model, res) {
        if (!EstablishmentSearch.list.get('id')) {
            EstablishmentSearch.list.save({}, { success:  $.proxy(this.setListId, this) });
        } else {
            this.saveListing();
        }
    },

    saveListing: function () {
        this.new_listing = new Listing({
            establishment_id: this.model.get('id'),
            list_id: EstablishmentSearch.list.get('id')
        });

        this.new_listing.save({}, { success: this.updateCollection });
    },

    setListId: function (list, res) {
        EstablishmentSearch.list = list;
        this.saveListing();
    },

    updateCollection: function (model, res) {
        EstablishmentSearch.listings.add(model);
        ModalView.hide();
    }
});
