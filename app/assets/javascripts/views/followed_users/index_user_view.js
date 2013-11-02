FollowedUsersIndexUserView = Backbone.View.extend({
    events:{
        'click': 'goToUserShow'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('followed_users/index_followed_user', this.model));
    },

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('id'), { trigger: true });
    }
});
