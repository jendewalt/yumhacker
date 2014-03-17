ListsEditPhotoView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_photo', this.model));
    }
});
