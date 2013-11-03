UsersShowFollowingContainerView = Backbone.View.extend({
    events: {
        'click .followers_tab': 'renderFollowers',
        'click .followed_users_tab': 'renderFollowedUsers'
    },

    initialize: function () {
        this.render();
        this.renderFollowers();  
    },

    render: function () {
        this.$el.html(render('users/show_following_container'));
    },

    renderFollowers: function () {
        this.followersIndexListView = new FollowersIndexListView({
            el: '.following_list_container',
            model: this.model
        });
    },

    renderFollowedUsers: function () {
        this.followedUsersIndexListView = new FollowedUsersIndexListView({
            el: '.following_list_container',
            model: this.model
        });        
    }

});
