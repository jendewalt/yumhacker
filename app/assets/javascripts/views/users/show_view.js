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
        this.followeds = new FollowedUserCollection({}, this.model.id);

        this.listenTo(this.followers, 'sync', this.renderFollowerList);
        this.listenTo(this.followeds, 'sync', this.renderFollowedList);
    },

    renderFollowerList: function () {
        new FollowingListView({
            el: '.followers',
            collection: this.followers
        });        
    },

    renderFollowedList: function () {
        new FollowingListView({
            el: '.followed_users',
            collection: this.followeds
        });        
    }
});
