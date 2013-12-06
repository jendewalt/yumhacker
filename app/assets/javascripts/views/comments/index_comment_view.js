CommentsIndexCommentView = Backbone.View.extend({
    events:{
        'click .delete_comment': 'deleteComment'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('comments/index_comment', this.model));
    }, 

    deleteComment: function () {
        if (CurrentUser.get('id') == this.model.get('user_id')) {
            console.log('Delete the comment');
            this.model.destroy();
        }
    }
});
