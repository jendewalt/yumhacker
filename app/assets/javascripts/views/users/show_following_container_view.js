UsersShowFollowingContainerView = Backbone.View.extend({
    events: {
        'click .followers_tab': 'renderFollowers',
        'click .followed_users_tab': 'renderFollowedUsers',
        'click .endorsements_tab': 'renderEndorsements'
    },

    initialize: function () {
        this.render();
        this.renderFollowers();  
    },

    render: function () {
        this.$el.html(render('users/show_following_container'));
    },

    renderFollowers: function (e) {
        $('.followers_tab').addClass('current_tab');
        $('.followed_users_tab').removeClass('current_tab');
        this.followersIndexListView = new FollowersIndexListView({
            el: '.following_list_container',
            model: this.model
        });
    },

    renderFollowedUsers: function (e) {
        $('.followed_users_tab').addClass('current_tab');
        $('.followers_tab').removeClass('current_tab');
        this.followedUsersIndexListView = new FollowedUsersIndexListView({
            el: '.following_list_container',
            model: this.model
        });        
    },

    renderEndorsements: function (e) {
        // $('.followed_users_tab').addClass('current_tab');
        // $('.followers_tab').removeClass('current_tab');
        this.endorsementsIndexListView = new EndorsementsIndexListView({
            el: '.following_list_container',
            model: this.model
        });     
    }
});
