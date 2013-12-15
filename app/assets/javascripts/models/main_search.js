MainSearch = new (Backbone.Model.extend({
    defaults: {
        lat: 37.7749295,
        lng: -122.4194155,
        location_name: 'San Francisco, CA'        
    },

    initialize: function () {
        if ($.cookie('main_search')) {
            this.set(JSON.parse($.cookie('main_search')));
        }
        var params = $.deparam(window.location.search.slice(1));

        if (typeof params.lat != 'undefined') this.set('lat', Number(params.lat));
        if (typeof params.lng != 'undefined') this.set('lng', Number(params.lng));

        this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('main_search', JSON.stringify(this.attributes), { path: '/' });
    },

    predicate: function () {
        var data = {
            lat: this.get('lat'),
            lng: this.get('lng')
        };
        return data;
    }

}))();