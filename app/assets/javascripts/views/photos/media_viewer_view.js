PhotosMediaViewerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.renderPhotos();

        this.$el.flexslider({
            slideshow: false,
            controlNav: 'thumbnails'
        });
       
        // Listening for newly selected photos to update it's own Photo model with
        // this.listenTo(this.collection, 'new_selection', function (new_model) {
        //     this.model.set(new_model.toJSON());
        //     this.render();
        // });
    },

    render: function (model) {
        this.$el.html(render('photos/media_viewer', this.model)); 
    },

    renderPhotos: function () {
        this.collection.each(function (photo) {
            this.renderPhoto(photo);
        }, this);
    },

    renderPhoto: function (photo) {
        this.photo_view = new PhotosMediaViewerPhotoView({
            model: photo,
            tagName: 'li'
        });

        this.$('ul').append(this.photo_view.el);
    }
});
