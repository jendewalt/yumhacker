PhotosIndexListView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },

    render: function () {
        this.$el.html('');

        this.collection.each(function (photo) {
            this.renderPhoto(photo);
        }, this);
    },

    renderPhoto: function (photo) {
        var photo_view = new PhotosIndexPhotoView({
            tagName: 'div',
            model: photo
        });

        this.$el.append(photo_view.el);
    }
});