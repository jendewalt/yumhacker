ApplicationHeaderView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();

        this.main_search_view = new MainSearchView({
            el: '#establishment_search_container'
        });
        
        this.search_navigation_links_view = new SearchNavigationLinksView({
            el: '#search_nav_links_container'
        });
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/header', CurrentUser));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
