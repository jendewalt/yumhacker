HeaderSearchOptionsView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/header_search_options'));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname + e.currentTarget.search, { trigger: true });
    }
});
