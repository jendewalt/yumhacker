HomePageFeaturedView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.featured_user = new HomePageFeaturedUserView({
            el: '#featured_user'
        });

        this.featured_list = new HomePageFeaturedListView({
            el: '#featured_list'
        });
    },

    render: function () {
        this.$el.html(render('home_page/featured'));

    }

});
