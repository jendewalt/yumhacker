ApplicationHeaderView = Backbone.View.extend({
    events: {
        'click a': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('layouts/header', CurrentUser));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
