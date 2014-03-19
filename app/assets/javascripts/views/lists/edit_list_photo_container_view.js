ListsEditListPhotoContainerView = Backbone.View.extend({
    events: {
        'click #add_photo_modal_btn button': 'openPhotoSelector'
    },

    initialize: function () {
        this.render(); 

        this.list_edit_photo_view = new ListsEditListPhotoView({
            model: this.model,
            el: '#list_photo_image_container',
            model: this.model
        });     

    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_container', this.model));
    },

    openPhotoSelector: function (e) {
        ModalView.show(new ListsEditListPhotoSelectorView({
            model: this.model,
            el: '#inner_modal_content',
        }));
    }

    // new ListsEditUploadImageFormView({
    //         model: this.model,
    //         el: '#upload_image_form_container',
    //     })
});
