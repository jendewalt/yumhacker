UsersShowFollowingContainerView = Backbone.View.extend({
    events: {
        'click a.tab': 'goToSection'
    },

    initialize: function (options) {
        this.listenTo(this.model, 'sync', this.render);

        if (options.section === 'following') {
            this.listenTo(this.model, 'sync', this.renderFollowedUsers);                
        } else if (options.section === 'followers') {
            this.listenTo(this.model, 'sync', this.renderFollowers);
        } else {
            this.listenTo(this.model, 'sync', this.renderEndorsements);                
        }
        
    },

    render: function () {
        this.$el.html(render('users/show_following_container', this.model));
    },

    renderEndorsements: function (e) {
        this.endorsementsIndexListContainerView = new EndorsementsIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });     
        
        $('#endorsements_tab').addClass('current_tab');
    },

    renderFollowedUsers: function (e) {
        this.followedUsersIndexListContainerView = new FollowedUsersIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });        

        $('#followed_users_tab').addClass('current_tab');
    },

    renderFollowers: function (e) {
        this.followersIndexListContainerView = new FollowersIndexListContainerView({
            el: '.following_list_container',
            model: this.model
        });

        $('#followers_tab').addClass('current_tab');
    },

    goToSection: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
