ListsEditListingPhotoContainerView = Backbone.View.extend({
    events: {
        'click .add_listing_photo_modal_btn button': 'openPhotoSelector'
    },

    initialize: function () {
        this.render(); 

        this.listing_edit_photo_view = new ListsEditListingPhotoView({
            model: this.model,
            el: this.$('.listing_photo_image_container')
        });     
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_photo_container', this.model));
    },

    openPhotoSelector: function (e) {
        ModalView.show(new ListsEditListingPhotoSelectorModalView({
            model: this.model,
            el: '#inner_modal_content',
        }));
    }
});