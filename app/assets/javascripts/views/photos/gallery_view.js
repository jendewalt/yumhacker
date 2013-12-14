PhotosGalleryView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('photos/gallery'));

        // if (!this.selectedPhotoModel) {
        //     var obj = $.extend(true, {}, this.collection.models[0]);
        //     this.selectedPhotoModel = new Photo().set(obj.toJSON());
        //     console.log(this.selectedPhotoModel);
        // }

        this.photos_media_viewer_view = new PhotosMediaViewerView({
            collection: this.collection,
            el: this.$('.flexslider')
        });

        // this.gallery_thumbs_list_view = new PhotosGalleryThumbsListView({
        //     collection: this.collection,
        //     el: '#thumbs_list_container'
        // });
    }
});
