MainSearchView = Backbone.View.extend({
    events: {
        'submit': 'getLatLng',
        'click #nearby_btn': 'getUserLocation',
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();

        this.listenTo(MainSearch, 'geocode', this.render);
        this.listenTo(MainSearch, 'change', this.render);
    },

    render: function () {
        this.$el.html(render('application/main_search'));
    },

    getLatLng: function (e) {
        e.preventDefault();
        Filter.set({ bounds: null }, { silent: true });
        MainSearch.geocode(e.target[1].value);
    },

    toggleFromFollowed: function (e) {
        MainSearch.set('from_followed', $(e.target).prop('checked'));
    },

    getUserLocation: function (e) {
        e.preventDefault();
        getCurrentLocation(function (position) {
            Filter.set({ bounds: null }, { silent: true });
            MainSearch.set({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                location_name: 'Current Location'
            });
            if (Backbone.history.fragment !== '') {
                App.navigate('/', { trigger: true });
            }
        });
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});