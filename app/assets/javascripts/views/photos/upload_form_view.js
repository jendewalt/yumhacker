PhotosUploadImageFormView = Backbone.View.extend({
    events: {
        'change #photo_upload_form': 'submitPhoto',
        'click button': 'showFileBrowser'
    },

    initialize: function () {
        this.render();

    },

    render: function () {
        this.$el.html(render('photos/photo_upload_image_form', this.model));
    },

    showFileBrowser: function (e) {
        $('input[type="file"]').click();
    },

    submitPhoto: function (e) {
        if(window.File && window.FileList && window.FileReader) {
            if ($.trim(e.target.value)) {
                var that = this;

                this.new_photo = new Photo({
                    establishment_id: this.model.get('id'),
                    collection: this.collection
                });

                this.new_photo.readFile(e.target.files[0], updateCollection);
            }  
        }
        
        var that = this;
        function updateCollection (model) {
            that.collection.fetch({ reset: true, data: { establishment_id: that.model.get('id') } });
        }
    }
});