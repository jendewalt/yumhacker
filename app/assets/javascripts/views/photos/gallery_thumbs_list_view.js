PhotosGalleryThumbsListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');

        this.collection.each(function (photo) {
            this.renderPhoto(photo);
        }, this);
    },

    renderPhoto: function (photo) {
        var photo_view = new PhotosGalleryThumbView({
            tagName: 'li',
            model: photo,
            collection: this.collection
        });

        this.$el.append(photo_view.el);
    }
});
