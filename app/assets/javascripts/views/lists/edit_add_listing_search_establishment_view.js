ListsEditAddListingSearchEstablishmentView = Backbone.View.extend({
    events: {
        'click .add_btn': 'addToList'
    },

    // this.model = FOUND ESTAB
    // this.listings = LISTINGS COLLECTION

    initialize: function (opts) {
        console.log('Found Estab: Init')
        this.listings = opts.listings;

        // Check if the establishment is already in the LIST so we can denote that on screen
        if (this.listings.findWhere({ establishment_id: this.model.id }) !== undefined) {
            console.log('listed true')
            this.model.set('listed', true);
        } else {
            this.model.set('listed', false);            
            console.log('listed false')
        }

        this.render();
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('lists/edit_add_listing_search_establishment', this.model));
    },

    addToList: function () {
        console.log('Found Estab: Add me to the list!');
        console.log(this.model);

        this.model.trigger('establishment_selected', this.model);
    }
});
