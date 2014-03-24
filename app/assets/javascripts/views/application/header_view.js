HeaderView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();
        this.listenTo(Location, 'change', this.render);
    },

    render: function () {
        this.$el.html('');

        this.$el.html(render('application/header'));

        this.current_location_view = new CurrentLocationView({
            el: '#current_location_container'
        });
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname + e.currentTarget.search, { trigger: true });
    }
});
