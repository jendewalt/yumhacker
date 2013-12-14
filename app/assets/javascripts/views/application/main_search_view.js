MainSearchView = Backbone.View.extend({
    events: {
        'submit': 'checkForRedirect',
        'click #nearby_btn': 'getUserLocation',
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();

        this.geolocations = new GeolocationCollection();

        this.listenTo(this.geolocations, 'reset', this.updateLatLng);
        this.listenTo(MainSearch, 'change', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/main_search'));
    },

    checkForRedirect: function (e) {
        e.preventDefault();

        if (Backbone.history.fragment) {
            App.navigate('/', { trigger: true });
        }
        this.getLatLng(e.target[1].value);
    },

    getLatLng: function (query) {
        this.geolocations.fetch({ reset: true, data: { query: query }});
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
        }        
    },

    toggleFromFollowed: function (e) {
        MainSearch.set('from_followed', $(e.target).prop('checked'));
    },

    getUserLocation: function () {
        getCurrentLocation(function (position) {
            MainSearch.set({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                location_name: 'Current Location'
            });
        });
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});