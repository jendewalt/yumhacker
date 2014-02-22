CommentsListingCommentView = Backbone.View.extend({
    events:{
        'click .delete_comment': 'deleteComment',
        'click .user_name': 'goToUserShow'
    },

    initialize: function () {
        console.log(this.model)
        var raw_time = new Date(this.model.get('created_at'));
        var formatted_time = moment(raw_time).format('MMM Do YYYY, h:mm a');
        this.model.set('formatted_time', formatted_time);

        this.listenTo(this.model, 'sync', this.render);

        this.render();
    },

    render: function () {
        this.$el.html(render('comments/listing_comment', this.model));
    }, 

    deleteComment: function () {
        if (CurrentUser.get('id') == this.model.get('user_id')) {
            this.model.destroy();
        }
    },

    goToUserShow: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
