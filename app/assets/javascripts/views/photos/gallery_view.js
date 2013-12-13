PhotosGalleryView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('photos/gallery'));

        this.gallery_main_image_view = new PhotosGalleryMainImageView({
            collection: this.collection,
            model: this.collection.models[0],
            el: '#main_image_container'
        });

        this.gallery_thumbs_list_view = new PhotosGalleryThumbsListView({
            collection: this.collection,
            el: '#thumbs_list_container'
        });
    }
});
