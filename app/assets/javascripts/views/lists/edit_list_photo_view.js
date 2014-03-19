ListsEditListPhotoView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_list_photo', this.model));
    }
});
