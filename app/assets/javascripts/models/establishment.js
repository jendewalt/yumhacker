Establishment = Backbone.Model.extend({
    urlRoot: '/api/establishments',

    initialize: function () {
        this.assignHours();
        this.setFormattedAttributes();
        this.on('sync', this.assignHours);
        this.on('sync', this.setFormattedAttributes);
    },

    assignHours: function () {
        this.hours = new HoursCollection(this.get('hours'));
    },

    setFormattedAttributes: function () {
        if (this.get('price')) {
            var price_symbol = '';
            _.each(_.range(this.get('price')), function (num) {
                price_symbol += '$';
            });

            this.set('price_symbol', price_symbol);
        }

        if (this.get('website')) {
            var formatted_url = this.get('website').replace(/\/$/, '').replace(/^http.*\/\//, '').replace(/^www[.]/, '');
            this.set('formatted_url', formatted_url);
        } else {
            this.set('formatted_url', '');
            this.set('website', '');
        }
    }
});
