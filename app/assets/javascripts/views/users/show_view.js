UsersShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render()

        new UsersShowUserView({
            el: '.user_model_container',
            model: this.model
        });

        new UsersShowFollowingContainerView({
            el: '.following_container',
            model: this.model            
        });

        // new FollowersIndexListView({
        //     el: '.following_list_container',
        //     model: this.model
        // });

        // new FollowedUsersIndexListView({
        //     el: '.following_list_container',
        //     model: this.model
        // });        
    },

    render: function () {
        this.$el.html(render('users/show'));
    }
});
