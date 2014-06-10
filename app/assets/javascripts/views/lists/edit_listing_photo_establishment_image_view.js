ListEditListingPhotoEstablishmentImageView = Backbone.View.extend({
    events: {
        'click img': 'saveAsListImage'
    },

    initialize: function (options) {
        this.listing = options.listing;
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_user_image', this.model));
    },

    saveAsListImage: function (e) {
        this.listing.set({ 
            'small_url': this.model.get('small_url'),
            'photo_id': this.model.get('id')
        });
        this.listing.trigger('change_photo');
        this.listing.save();
        ModalView.hide();
    }
});