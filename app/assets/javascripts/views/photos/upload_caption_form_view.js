PhotosUploadCaptionFormView = Backbone.View.extend({
       events: {
        'submit': 'submitCaption'
    },

    initialize: function () {
        this.render();
        console.log(this.model)
    },

    render: function () {
        this.$el.html(render('photos/photo_upload_caption_form', this.model));
        this.$el.show();
    },

    submitCaption: function (e) {
        e.preventDefault();
    }
})