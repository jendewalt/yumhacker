EstablishmentShowUploadImageFormView = Backbone.View.extend({
    events: {
        'change .photo_upload_form': 'submitPhoto',
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
        this.upload_throbber_view.$('.throbber').show();

        if(window.File && window.FileList && window.FileReader) {
            if ($.trim(e.target.value)) {
                var that = this;

                this.new_photo = new Photo({
                    establishment_id: this.model.get('id'),
                    collection: this.collection
                });

                this.new_photo.readFile(e.target.files[0], updatePreviewPhoto);
            }  
        }
            
        $("input[type='file']").val('');
        
        var that = this;
        function updatePreviewPhoto (model, response) {
            that.model.set('preview_photo', model.get('small_url'));
            that.upload_throbber_view.$('.throbber').hide();   
            that.showCaptionForm(model);
        }            
    },

    showCaptionForm: function (model) {
        ModalView.show(new EstablishmentShowCaptionFormView({
            el: '#inner_modal_content',
            model: model
        }));
    }
});