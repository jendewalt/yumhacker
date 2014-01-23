MainSearch = new (Backbone.Model.extend({
    defaults: {
        location_name: 'San Francisco, CA'        
    },

    initialize: function () {
        if ($.cookie('main_search')) {
            this.set(JSON.parse($.cookie('main_search')));
        }
        var params = $.deparam(window.location.search.slice(1));

        if (typeof params.lat != 'undefined') this.set('lat', Number(params.lat));
        if (typeof params.lng != 'undefined') this.set('lng', Number(params.lng));

        this.googleGeocoder = new google.maps.Geocoder();

        // this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('main_search', JSON.stringify(this.attributes), { path: '/' });
    },

    geocode: function (query) {
        this.googleGeocoder.geocode( { 'address': query }, $.proxy(this.updateFromGeocoder, this));
    },

    updateFromGeocoder: function (result, status) {
        if (status == 'OK') {
            var latlng = result[0].geometry.location;
            var lat = latlng.lat();
            var lng = latlng.lng();
            var formatted_address = result[0].formatted_address; 
            this.set({
                lat: lat,
                lng: lng,
                location_name: formatted_address
            });
        }
        
        this.trigger('geocode');            

        if (Backbone.history.fragment !== '') {
            App.navigate('/', { trigger: true });
        }
    },

    predicate: function () {
        var data = {
            lat: this.get('lat'),
            lng: this.get('lng'),
            location_name: this.get('location_name')
        };
        return data;
    }

}))();
    