FooterView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/footer'));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
