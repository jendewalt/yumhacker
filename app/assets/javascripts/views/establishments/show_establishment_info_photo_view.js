EstablishmentShowEstablishmentInfoPhotoView = Backbone.View.extend({
    events: {
        'click #photos_preview_container': 'goToPhotoIndex'
    },

    initialize: function () {
        this.render(); 
        this.collection = new PreviewPhotoCollection();

        this.establishment_show_photos_preview_view = new EstablishmentShowPhotosPreviewView({
            model: this.model,
            el: '#photos_preview_container',
            collection: this.collection
        });  

        this.photos_upload_forms_view = new PhotosUploadFormsView({
            model: this.model,
            el: '#photos_upload_forms_container',
            collection: this.collection
        });     
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_info_photo', this.model));
    },

    goToPhotoIndex: function () {
        App.navigate(e.target.pathname, { trigger: true });
    }
});
