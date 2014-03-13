CommentsListingCommentView = Backbone.View.extend({
    events:{
        'click .delete_comment': 'deleteComment',
    },

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(render('comments/listing_comment', this.model));
    }, 

    deleteComment: function () {
        if (CurrentUser.get('id') == this.model.get('user_id')) {
            this.model.destroy();
        }
    }
});
