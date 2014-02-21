ListsShowDescriptionView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('lists/show_description', this.model));
    }
});