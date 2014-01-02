EstablishmentHourView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('establishments/establishment_hour', this.model));
    }
});