MainSearchView = Backbone.View.extend({
    events: {
        'submit': 'getLatLng',
        'click #from_followed': 'toggleFromFollowed',
        'click #nearby_btn': 'getUserLocation'
    },

    initialize: function () {
        this.render();

        this.geolocations = new GeolocationCollection();

        this.listenTo(this.geolocations, 'reset', this.updateLatLng);
        this.listenTo(MainSearch, 'change', this.render);
        window.setTimeout($.proxy( function () {
            this.listenTo(App, 'route', this.removeListeners);
        }, this), 0);
    },

    removeListeners: function (e) {
        this.stopListening();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/main_search'));
    },

    getLatLng: function (e) {
        e.preventDefault();
        this.geolocations.fetch({ reset: true, data: { query: e.target[0].value }});
    },

    updateLatLng: function () {
        var result;
        if (this.geolocations.length > 0) {
            result = this.geolocations.models[0];
            MainSearch.set({
                lat: result.get('lat'),
                lng: result.get('lng'),
                location_name: result.get('formatted_address')
            });

            this.fetchEstablishments();
        }        
    },

    fetchEstablishments: function () {
        this.collection.fetch({ reset: true, data: MainSearch.predicate() });
    },

    toggleFromFollowed: function (e) {
        MainSearch.set('from_followed', $(e.target).prop('checked'));
        this.fetchEstablishments();
    },

    getUserLocation: function () {
        var that = this;
        getCurrentLocation(function (position) {
            MainSearch.set({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                location_name: 'Current Location'
            });
            that.fetchEstablishments();
        });
    }

});