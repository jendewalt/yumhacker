PhotosGalleryView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('photos/gallery'));

        this.photos_media_viewer_view = new PhotosMediaViewerView({
            collection: this.collection,
            el: this.$('.flexslider')
        });
    }
});
