ListsEditListingPhotoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.listenTo(this.model, 'change_photo', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_photo', this.model));
    }
});
