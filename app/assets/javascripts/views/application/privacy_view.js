PrivacyView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/privacy'));
        window.scrollTo(0,0);
    }
});
