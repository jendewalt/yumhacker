HomePageFeaturedListView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.model = new List({ id: 26 });
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch(); 
    },

    render: function () {
        this.$el.html(render('home_page/featured_list', this.model));
    },
    
    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }


});
