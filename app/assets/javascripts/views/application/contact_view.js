ContactView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/contact'));
        window.scrollTo(0,0);
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
