ListsEditAddListingSearchEstablishmentView = Backbone.View.extend({
    events: {
        'click .add_btn': 'addToList'
    },

    initialize: function (opts) {
        this.listings = opts.listings;

        // Check if the establishment is already in the LIST so we can denote that on screen
        if (this.listings.findWhere({ establishment_id: this.model.id }) !== undefined) {
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
        this.model.trigger('establishment_selected', this.model);
    }
});
