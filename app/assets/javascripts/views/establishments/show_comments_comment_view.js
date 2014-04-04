EstablishmentShowCommentView = Backbone.View.extend({
    events:{
        'click .delete_comment': 'deleteComment',
        'click .user_name, a.avatar': 'navigate'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('establishments/show_comment', this.model));
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
