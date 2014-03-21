ListsEditListingsContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {  
        this.render();  
        this.lists_edit_listings_list_view = new ListsEditListingsListView({
            el: 'ol.establishments_list',
            model: this.model,
            collection: this.collection
        });

        // this.lists_edit_listings_add_listing_button_view = new ListsEditListingsAddListingButtonView({
        //     el: '#add_listing_button_view',
        //     model: this.model,
        //     collection: this.collection
        // });
    },

    render: function () {
        this.$el.html(render('lists/edit_listings_container'));
    }
});
