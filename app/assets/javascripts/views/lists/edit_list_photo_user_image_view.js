ListEditListPhotoUserImageView = Backbone.View.extend({
    events: {
        'click img': 'saveAsListImage'
    },

    initialize: function (options) {
        this.list = options.list;
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_user_image', this.model));
    },

    saveAsListImage: function (e) {
        this.list.set({ 
            'small_url': this.model.get('small_url'),
            'photo_id': this.model.get('id')
        });
        this.list.trigger('change_photo');
        this.list.save();
        ModalView.hide();
    }
});