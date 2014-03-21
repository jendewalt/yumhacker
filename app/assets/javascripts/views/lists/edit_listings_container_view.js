ListsEditListingsContainerView = Backbone.View.extend({
    events: {
        'click #listing_container_add_listing_btn': 'openListingSearchModal'
    },

    initialize: function () {  
        this.render();  
        this.lists_edit_listings_list_view = new ListsEditListingsListView({
            el: 'ol.establishments_list',
            model: this.model,
            collection: this.collection
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_listings_container'));
    },

    openListingSearchModal: function () {
        ModalView.show(new ListsEditAddListingSearchModalView({
            list: this.model,
            listings: this.collection,
            el: '#inner_modal_content'
        }));
    }
});
