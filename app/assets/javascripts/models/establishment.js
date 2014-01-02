Establishment = Backbone.Model.extend({
	urlRoot: '/api/establishments',

    initialize: function () {
        if (this.get('price')) {
            var price_symbol = '';
            _.each(_.range(this.get('price')), function (num) {
                price_symbol += '$';
            });

            this.set('price_symbol', price_symbol);
        }
        this.assignHours();
        this.on('sync', this.assignHours);
    },

    assignHours: function () {
        this.hours = new HoursCollection(this.get('hours'));
    }
});
