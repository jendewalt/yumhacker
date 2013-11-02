UsersShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render()

        new UsersShowUserView({
            el: '.user_model_container',
            model: this.model
        });

        new FollowersIndexListView({
            el: 'ul.followers',
            model: this.model
        });

        new FollowedUsersIndexListView({
            el: 'ul.followed_users',
            model: this.model
        });        
    },

    render: function () {
        this.$el.html(render('users/show'));
    }
});
