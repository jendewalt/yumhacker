PhotosIndexPhotoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/index_photo', this.model));
    }
});