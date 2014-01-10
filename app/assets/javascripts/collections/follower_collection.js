FollowersCollection = Backbone.Collection.extend({
    model: User,

    url: '/api/users/followers',

    parse: function (res) {
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total_pages = res.total_pages;
        this.offset = res.offset;
        this.total = res.total;

        return res.followers;
    }
});
