UsersShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.model.fetch();

        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('users/show', this.model));
        this.followers = new FollowerCollection({}, this.model.id);
        this.followed_users = new FollowedUserCollection({}, this.model.id);

        this.listenTo(this.followers, 'sync', this.renderFollowersList);
        this.listenTo(this.followed_users, 'sync', this.renderFollowedUsersList);
    },

    renderFollowersList: function () {
        new FollowersIndexListView({
            el: '.followers',
            collection: this.followers
        });        
    },

    renderFollowedUsersList: function () {
        new FollowedUsersIndexListView({
            el: '.followed_users',
            collection: this.followed_users
        });        
    }
});
