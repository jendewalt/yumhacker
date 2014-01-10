FollowedUsersIndexListContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowedUsersCollection();
        this.render();
    },

    render: function () {
        this.$el.html(render('followed_users/index_followed_users_list_container'));

        this.followedUsersIndexListView = new FollowedUsersIndexListView({
            el: 'ul.followed_users',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
    }
});
