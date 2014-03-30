EstablishmentShowPreviewPhotosContainerView = Backbone.View.extend({
    events: {
        'click #preview_photos_container': 'navigate'
    },

    initialize: function () {
        this.listenTo(this.model, 'change:preview_photo', this.changePhoto);
        this.render();    

        this.establishment_show_upload_image_form_view = new EstablishmentShowUploadImageFormView({
            model: this.model,
            el: '#upload_image_form_container',
            collection: this.collection
        });
    },

    render: function (e) {
        this.$el.html(render('establishments/show_establishment_preview_photos_container', this.model));
    },

    changePhoto: function () {
        this.$('a img').attr('src', this.model.get('preview_photo'));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
