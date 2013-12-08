EstablishmentShowEstablishmentInfoPhotoView = Backbone.View.extend({
    events: {},

    initialize: function () {
        this.render(); 

        // this.photos_preview_view = new PhotosPreviewView({
        //     model: this.model,
        //     el: '#photos_preview_container'
        // });  

        this.photos_upload_image_form_view = new PhotosUploadImageFormView({
            model: this.model,
            el: '#photos_form_container'
        });     
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_info_photo', this.model));
    }
});
