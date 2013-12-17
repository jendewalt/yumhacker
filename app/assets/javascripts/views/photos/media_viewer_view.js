PhotosMediaViewerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.renderPhotos();

        this.$el.flexslider({
            slideshow: false,
            controlNav: 'thumbnails',
            thumbCaptions: true,
            controlsContainer: ".flex-container",
            itemWidth: '30px'
        });
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
