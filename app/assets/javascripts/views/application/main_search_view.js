MainSearchView = Backbone.View.extend({
    events: {
        'submit': 'getLatLng',
        'click #nearby_btn': 'getUserLocation',
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
        this.listenTo(Client, 'change:formatted_address', this.render);
    },

    render: function () {
        this.$el.html(render('application/main_search'));
    },

    getLatLng: function (e) {
        e.preventDefault();
        MainSearch.geocode(e.target[1].value);
    },

    getUserLocation: function (e) {
        e.preventDefault();
        window.getCurrentLocation(function (position) {
            var center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude                
            }
            Client.set('formatted_address', 'Current Location')
            Location.set({ 'center': center, 'contained_in': 'radius' });

            // if (Backbone.history.fragment !== '') {
            //     App.navigate('/', { trigger: true });
            // }
        });
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});