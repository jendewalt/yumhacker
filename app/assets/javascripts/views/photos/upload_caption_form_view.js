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
        var caption = e.target[0].value
        this.model.save({'caption': caption}, {success: removeCaptionForm});

        var that = this;
        function removeCaptionForm (model) {
            that.$el.fadeOut('300');
            that.remove();
        }
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }    
});
