UsersShowTabsView = Backbone.View.extend({
    events: {
        'click a.tab': 'navigate'
    },

    initialize: function (options) {
        this.tabs_data = options.tabs_data;
        this.render();
    },

    render: function () {
        this.$el.html(render('users/show_tabs', this.tabs_data));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
