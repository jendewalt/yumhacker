UsersShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.model.fetch();

        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('users/show', this.model));
    }
});
