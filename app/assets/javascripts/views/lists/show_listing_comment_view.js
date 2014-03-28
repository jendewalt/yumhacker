ListsShowListingCommentView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show_listing_comment', this.model));
    }
});
