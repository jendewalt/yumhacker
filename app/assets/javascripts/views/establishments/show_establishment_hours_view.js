EstablishmentsShowEstablishmentHoursView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
        this.renderHours();
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_hours', this.collection));
    }, 

    renderHours: function () {
        var days = []

        for (var i = 0; i <= 6; i++) {
            var hours = this.collection.where({ open_day: i });
            if (hours.length > 0) {
                days.push({ day: i, hours: hours });
            }
        }
        _.each(days, function (day) {
            var class_name = day.day === Number(moment().format('d')) ? 'today' : '';
            this.hour_view = new EstablishmentHourView({
                model: day,
                tagName: 'tr',
                className: class_name
            });

            this.$('table').append(this.hour_view.el);
        }, this);
    }
});