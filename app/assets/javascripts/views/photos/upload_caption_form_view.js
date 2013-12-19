PhotosUploadCaptionFormView = Backbone.View.extend({
       events: {
        'submit': 'submitCaption',
        'click .skip': 'exitCaptionForm'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/photo_upload_caption_form', this.model));
        this.$el.show();
    },

    submitCaption: function (e) {
        e.preventDefault();
        var caption = $.trim(e.target[0].value);

        if (caption.length < 255) {
            this.model.save({ 'caption': caption }, { success: removeCaptionForm });
        } else {
            alert('Captions must be fewer than 255 characters');
        }

        var that = this;
        function removeCaptionForm (model) {
            that.exitCaptionForm();
        }
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    },

    exitCaptionForm: function () {
        this.$el.fadeOut('100');
        this.remove();
    }    
});
