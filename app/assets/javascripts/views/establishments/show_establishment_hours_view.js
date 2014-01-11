EstablishmentsShowEstablishmentHoursView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
        this.renderHours();
    },

    render: function () {
        this.$el.html(render('establishments/show_establishment_hours'));
    }, 

    renderHours: function () {
        var days = []

        // If there is only one entry and the open time and close times are the same then the place is open 24/7
        if (this.collection.length === 1 && ( Number(this.collection.models[0].get('open_time')) == Number(this.collection.models[0].get('close_time')) ) ) {

            for (var i = 0; i <= 6; i++) {
                var hours = this.collection.models[0];
                days.push({ day: i, hours: [hours] });
            }
        } else {
            for (var i = 0; i <= 6; i++) {
                var hours = this.collection.where({ open_day: i });
                if (hours.length > 0) {
                    days.push({ day: i, hours: hours });
                }
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