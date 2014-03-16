PhotosUploadFormsImageFormView = Backbone.View.extend({
    events: {
        'change #photo_upload_form': 'submitPhoto',
        'click button': 'showFileBrowser'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/photo_upload_image_form', this.model));

        this.upload_throbber_view = new UploadThrobberView({
            el: '.upload_throbber_container',
        });
    },

    showFileBrowser: function (e) {
        if (CurrentUser.logged_in()) {
            $('input[type="file"]').click();
        } else {
            CurrentUser.authenticate();
        }
    },

    submitPhoto: function (e) {
        this.upload_throbber_view.$el.show();

        if(window.File && window.FileList && window.FileReader) {
            if ($.trim(e.target.value)) {
                var that = this;

                this.new_photo = new Photo({
                    list_id: this.model.get('id'),
                });

                this.new_photo.readFile(e.target.files[0], updateCollection);
            }  
        }
            
        $("input[type='file']").val('');
        
        var that = this;
        function updateCollection (model, response) {
            console.log(model)
            console.log(response)
            // that.collection.fetch({ reset: true, data: { establishment_id: model.get('establishment_id') } });
            // that.showCaptionForm(model, response);
        }            
    }
});