ListsEditAddListingSearchEstablishmentView = Backbone.View.extend({
    events: {
        'click .add_btn': 'addToList'
    },

    initialize: function () {
        this.render();
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('lists/edit_add_listing_search_establishment', this.model));
    },

    addToList: function () {
        if (CurrentUser.logged_in()) {
            if (this.model.get('id')) {
                createListing(this.model);
            } else {
                this.model.save({}, { success: createListing });
            }
        } else  {
            CurrentUser.authenticate();
        }

        function createListing(model, res) {
            this.new_listing = new Listing({
                establishment_id: model.get('id'),
                list_id: EstablishmentSearch.list.get('id')
            });

            this.new_listing.save({}, { success: updateCollection });
        }

        function updateCollection (model, res) {
            EstablishmentSearch.listings.add(model);
            ModalView.hide();
        }
    }
});
