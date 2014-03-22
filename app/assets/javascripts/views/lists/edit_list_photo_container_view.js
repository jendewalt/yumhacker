ListsEditListPhotoContainerView = Backbone.View.extend({
    events: {
        'click #add_photo_modal_btn button': 'openPhotoSelector'
    },

    initialize: function () {
        this.render(); 

        this.list_edit_photo_view = new ListsEditListPhotoView({
            model: this.model,
            el: '#list_photo_image_container'
        });     

    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_container', this.model));
    },

    openPhotoSelector: function (e) {
        ModalView.show(new ListsEditListPhotoSelectorModalView({
            model: this.model,
            el: '#inner_modal_content',
        }));
    }
});
