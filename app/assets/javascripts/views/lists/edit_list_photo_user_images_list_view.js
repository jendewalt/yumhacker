ListsEditListPhotoUserImagesListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new PhotosCollection({});
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true, data: { user_id: CurrentUser.id } });
    },

    render: function () {
        this.collection.each(function (image) {
            this.renderUserImage(image);
        }, this);
    },

    renderUserImage: function (image) {
        var image_view = new ListEditListPhotoUserImageView({
            tagName: 'li',
            model: image,
            list: this.model
        });

        this.$el.append(image_view.el);
    }
});