EstablishmentShowEstablishmentInfoPhotoView = Backbone.View.extend({
    events: {},

    initialize: function () {
        this.render(); 
        this.collection = new PreviewPhotoCollection();

        this.establishment_show_photos_preview_view = new EstablishmentShowPhotosPreviewView({
            model: this.model,
            el: '#photos_preview_container',
            collection: this.collection
        });  

        this.photos_upload_image_form_view = new PhotosUploadImageFormView({
            model: this.model,
            el: '#photos_form_container',
            collection: this.collection
        });     
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_info_photo', this.model));
    }
});
