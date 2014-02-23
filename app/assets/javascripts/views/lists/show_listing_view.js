ListsShowListingView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        if (this.model.get('comment')) {
            this.comment_view = new CommentsListingCommentView({
                el: this.$('.listing_comment_container'),
                model: new Comment(this.model.get('comment'))
            });
        }
    },

    render: function () {
        this.$el.html(render('lists/show_listing', this.model));
    }
});
