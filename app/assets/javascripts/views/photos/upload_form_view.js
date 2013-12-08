PhotosUploadImageFormView = Backbone.View.extend({
    events: {
        'change #photo_upload': 'submitPhoto'
    },

    initialize: function () {
        this.render();

    },

    render: function () {
        this.$el.html(render('photos/photo_upload_image_form', this.model));
    },

    submitPhoto: function (e) {
        if(window.File && window.FileList && window.FileReader) {
            if ($.trim(e.target.value)) {
                var that = this;
                console.log(e.target.files);

                this.new_photo = new Photo({
                    establishment_id: this.model.get('id')
                });

                this.new_photo.readFile(e.target.files[0]);
            }
            
        }
    }
});