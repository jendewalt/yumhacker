PhotosMediaViewerPhotoView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function (model) {
        this.$el.html(render('photos/media_viewer_photo', this.model)); 
        this.$el.attr('data-thumb', this.model.get('small_url'))
    }
});