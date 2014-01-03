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

        $('#caption_input').on('keyup', function () {
            $('#char_counter span').html(100 - $(this).val().length);
        });
    },

    submitCaption: function (e) {
        e.preventDefault();
        var caption = $.trim(e.target[0].value);

        if (caption.length <= 100) {
            this.model.save({ 'caption': caption });
            this.exitCaptionForm();
        } else {
            alert('Captions must be fewer than 255 characters');
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
