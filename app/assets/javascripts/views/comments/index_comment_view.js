CommentsIndexCommentView = Backbone.View.extend({
    events:{
        'click .delete_comment': 'deleteComment',
        'click .user_name, a.avatar': 'navigate'
    },

    initialize: function () {
        var raw_time = new Date(this.model.get('created_at'));
        var formatted_time = moment(raw_time).format('MMM Do YYYY, h:mm a');
        this.model.set('formatted_time', formatted_time);

        this.render();
    },

    render: function () {
        this.$el.html(render('comments/index_comment', this.model));
    }, 

    deleteComment: function () {
        if (CurrentUser.get('id') == this.model.get('user_id')) {
            this.model.destroy();
        }
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
