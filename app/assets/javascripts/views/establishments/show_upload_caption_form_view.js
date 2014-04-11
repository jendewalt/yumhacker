EstablishmentShowCaptionFormView = Backbone.View.extend({
    events: {
        'submit': 'submitCaption',
    },

    initialize: function () {
        this.render();
        $('textarea').autosize();
    },

    render: function () {
        this.$el.html(render('photos/photo_upload_caption_form', this.model));

        $('#caption_input').on('keyup', function () {
            $('#char_counter span').html(255 - $(this).val().length);
        });
    },

    submitCaption: function (e) {
        e.preventDefault();
        var caption = $.trim(e.target[0].value);

        if (caption.length <= 255) {
            this.model.save({ 'caption': caption });
            ModalView.hide();
        } else {
            alert('Captions must be fewer than 255 characters');
        }
    }   
});
