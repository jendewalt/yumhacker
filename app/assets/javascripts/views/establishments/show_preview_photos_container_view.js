EstablishmentShowPreviewPhotosContainerView = Backbone.View.extend({
    events: {
        'click #preview_photos_container': 'navigate'
    },

    initialize: function () {
        this.render(); 
        this.collection = new PreviewPhotoCollection();

        this.establishment_show_photos_preview_view = new EstablishmentShowPreviewPhotosView({
            model: this.model,
            el: '#preview_photos_container',
            collection: this.collection
        });     

        this.establishment_show_upload_image_form_view = new EstablishmentShowUploadImageFormView({
            model: this.model,
            el: '#upload_image_form_container',
            collection: this.collection
        });
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_preview_photos_container', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
