ListsEditListingPhotoSelectorModalView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render(); 

        this.establishment_images_list_view = new ListsEditListingPhotoEstablishmentImagesListView({
            model: this.model,
            el: '#establishment_images_list',
        });     
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_photo_selector_modal', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        ModalView.hide();
        App.navigate(e.target.pathname, { trigger: true });
    }
});