HomePageListView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('home_page/list', this.model));
    },

    navigate: function (e) {
        console.log('list clicked')
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }   
});
