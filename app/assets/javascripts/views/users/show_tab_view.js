UsersShowTabsView = Backbone.View.extend({
    events: {
        'click a.tab': 'navigate'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('users/show_tabs', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
