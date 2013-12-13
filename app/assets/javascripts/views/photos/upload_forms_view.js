PhotosUploadFormsView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.photos_upload_forms_image_form_view = new PhotosUploadFormsImageFormView({
            model: this.model,
            el: '#upload_image_form_container',
            collection: this.collection
        });  
    },

    render: function () {
        this.$el.html(render('photos/photo_upload_forms', this.model));
    }
});