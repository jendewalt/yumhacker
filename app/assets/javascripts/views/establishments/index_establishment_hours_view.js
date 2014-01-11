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
        var day = {};
        var open_day = Number(moment().format('d'));
        var hours;

        // If there is only one entry and the open time and close times are the same then the place is open 24/7
        if (this.collection.length === 1 && ( Number(this.collection.models[0].get('open_time')) == Number(this.collection.models[0].get('close_time')) )) {
            hours = [this.collection.models[0]];
        } else {
            hours = this.collection.where({ open_day: open_day });
        }        

        if (hours.length > 0) {
            day.day = open_day;
            day.hours = hours;
            this.hour_view = new EstablishmentHourView({
                model: day,
                tagName: 'tr'
            });

            this.$('table').append(this.hour_view.el);
        }
    }
});