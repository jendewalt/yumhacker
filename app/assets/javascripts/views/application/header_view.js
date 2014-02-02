HeaderView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
        this.listenTo(Location, 'change', this.render);
    },

    render: function () {
        this.$el.html('');

        this.$el.html(render('application/header', CurrentUser));

        this.main_search_view = new MainSearchView({
            el: '#establishment_search_container'
        });
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname + e.currentTarget.search, { trigger: true });
    }
});
