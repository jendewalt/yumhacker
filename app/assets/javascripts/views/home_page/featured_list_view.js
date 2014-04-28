HomePageFeaturedListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        // TODO: make a featured list model
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch(); 
    },

    render: function () {
        this.$el.html(render('home_page/featured_list', this.model));
    }
});
