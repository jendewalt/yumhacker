FollowersIndexListContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowersCollection();
        this.render();
    },

    render: function () {
        this.$el.html(render('followers/index_followers_list_container'));

        this.followersIndexListView = new FollowersIndexListView({
            el: 'ul.followers',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
    }
});
