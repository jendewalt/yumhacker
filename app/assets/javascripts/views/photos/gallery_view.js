PhotosGalleryView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'all', function (e) {
            console.log('Gallery View collection event: ' + e);
        });

        // Listening for Estab Photo Collection sync
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        console.log('Gallery View render')
        
        this.$el.html('');
        this.$el.html(render('photos/gallery'));

        if (!this.selectedPhotoModel) {
            var obj = $.extend(true, {}, this.collection.models[0]);
            this.selectedPhotoModel = new Photo().set(obj.toJSON());
            console.log(this.selectedPhotoModel);
        }

        this.gallery_main_image_view = new PhotosGalleryMainImageView({
            collection: this.collection,
            model: this.selectedPhotoModel,
            el: '#main_image_container'
        });

        this.gallery_thumbs_list_view = new PhotosGalleryThumbsListView({
            collection: this.collection,
            el: '#thumbs_list_container'
        });
    }
});
