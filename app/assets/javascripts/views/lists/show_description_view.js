ListsShowDescriptionView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show_description', this.model));
    }
});