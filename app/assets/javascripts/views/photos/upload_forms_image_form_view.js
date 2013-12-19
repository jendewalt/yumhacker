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
    },

    showFileBrowser: function (e) {
        if (CurrentUser.get('id')) {
            $('input[type="file"]').click();
        } else {
            this.showAuthenticationOpts();
        }
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
            
        $("input[type='file']").val('');
        
        var that = this;
        function updateCollection (model, response) {
            that.collection.fetch({ reset: true, data: { establishment_id: model.get('establishment_id') } });
            that.showCaptionForm(model, response);
        }            
    },

    showCaptionForm: function (model, response, options) {
        this.photos_upload_photo_caption_form = new PhotosUploadCaptionFormView({
            model: model,
            el: '#upload_caption_form_container'
        });
    },

    showAuthenticationOpts: function () {
        $('#login_modal_container').fadeIn('60');
    }
});