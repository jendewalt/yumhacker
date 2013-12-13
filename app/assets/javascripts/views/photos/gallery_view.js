PhotosGalleryView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('photos/gallery'));

        var obj = $.extend(true, {}, this.collection.models[0]);
        var myModel = new Photo().set(obj.toJSON());
        console.log(myModel)

        this.gallery_main_image_view = new PhotosGalleryMainImageView({
            collection: this.collection,
            model: myModel,
            el: '#main_image_container'
        });

        this.gallery_thumbs_list_view = new PhotosGalleryThumbsListView({
            collection: this.collection,
            el: '#thumbs_list_container'
        });
    }
});
