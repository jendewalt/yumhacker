ListsEditListingsContainerView = Backbone.View.extend({
    events: {
        'click #listing_container_add_listing_btn': 'openListingSearchModal'
    },

    // this.model = LIST
    // this.collection = LISTINGS

    initialize: function () {  
        this.render();  
        this.lists_edit_listings_list_view = new ListsEditListingsListView({
            el: 'ol.establishments_list',
            model: this.model
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_listings_container'));
    },

    openListingSearchModal: function () {
        ModalView.show(new ListsEditAddListingSearchModalView({
            model: this.model,
            el: '#inner_modal_content'
        }));
    }
});
