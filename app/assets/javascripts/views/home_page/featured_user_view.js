HomePageFeaturedUserView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        // TODO: make a featured user model
        this.model = new User({ id: 1 });
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch(); 
    },

    render: function () {
        this.$el.html(render('home_page/featured_user', this.model));
    }

});