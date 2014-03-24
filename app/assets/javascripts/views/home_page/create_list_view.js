HomePageCreateListView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('home_page/create_list'));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }

});