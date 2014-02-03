MainSearchView = Backbone.View.extend({
    events: {
        'submit': 'getLatLng',
        'click #nearby_btn': 'getUserLocation',
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();
        this.listenTo(Client, 'change:formatted_address', this.changeInputValue);
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/main_search'));
    },

    changeInputValue: function () {
        $('#location_container input').val(Client.get('formatted_address'));
    },

    getLatLng: function (e) {
        e.preventDefault();
        if (e.target[1].value === 'Current Location') {
            this.getUserLocation()
        } else {
            MainSearch.geocode(e.target[1].value);
        }
    },

    getUserLocation: function (e) {
        if (e) e.preventDefault();
        window.getCurrentLocation(function (position) {
            var center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude                
            }
            Client.set('formatted_address', 'Current Location')
            Location.set({ 'center': center, 'contained_in': 'radius' });

            if (Backbone.history.fragment !== '') {
                var params = _.extend(Location.predicate(), Filter.predicate(), Client.predicate());
                App.navigate('/' + '?' + $.param(params), { trigger: true });
            }
        });
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        e.stopPropagation();
        App.navigate(e.target.pathname, { trigger: true });
    }
});