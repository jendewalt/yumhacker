ListsShowTitleView = Backbone.View.extend({
    events: {
        'a': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show_title', this.model));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});