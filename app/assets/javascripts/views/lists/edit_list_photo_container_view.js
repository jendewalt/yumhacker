ListsEditListPhotoContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render(); 

        this.list_edit_photo_view = new ListEditListPhotoView({
            model: this.model,
            el: '#photo_container',
            model: this.model
        });     

        this.list_edit_upload_image_form_view = new ListEditUploadImageFormView({
            model: this.model,
            el: '#upload_image_form_container',
            model: this.model
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_container', this.model));
    },

    navigate: function (e) {
        console.log('nav')
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
