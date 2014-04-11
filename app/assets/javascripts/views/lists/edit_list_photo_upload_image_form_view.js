ListsEditListPhotoUploadImageFormView = Backbone.View.extend({
    events: {
        'change .photo_upload_form': 'submitPhoto',
        'click button': 'showFileBrowser'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo_upload_image_form', this.model));

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
        // TODO: Shut down selection interface while image is uploading
        $('.throbber').show();
        this.model.save({}, { success: $.proxy( function () { this.savePhoto(e) }, this) });
    },

    savePhoto:function (e) {
        if(window.File && window.FileList && window.FileReader) {
            if ($.trim(e.target.value)) {

                this.new_photo = new Photo({
                    list_id: this.model.get('id'),
                    model: this.model
                });

                this.new_photo.readFile(e.target.files[0], updateCollection);
            }  
        }
            
        $("input[type='file']").val('');
        
        var that = this;
        function updateCollection (model, response) {
            that.model.set('small_url', model.get('small_url'));
            that.model.trigger('change_photo');
            ModalView.hide();
        }                    
    }
        
});