EstablishmentsIndexEstablishmentHoursView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
        this.renderTodaysHours();
    },

    render: function () {
        this.$el.html(render('establishments/index_establishment_hours', this.collection));
    }, 

    renderTodaysHours: function () {
        var hours = this.collection.where({ open_day: Number(moment().format('d')) });

        _.each(hours, function (hour) {
            this.hour_view = new EstablishmentHourView({
                model: hour,
                tagName: 'li'
            });

            this.$('ul').append(this.hour_view.el);
        }, this);
    }
});