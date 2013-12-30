PhotosPreviewPhotoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/preview_photo', this.model));
    }
});