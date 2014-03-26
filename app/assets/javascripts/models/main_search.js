MainSearch = new (Backbone.Model.extend({
    initialize: function () {
        this.googleGeocoder = new google.maps.Geocoder();
    },

    geocode: function (query) {
        this.query = query;
        this.googleGeocoder.geocode( { 'address': query }, $.proxy(this.updatePositionFromGeocoder, this));
    },

    updatePositionFromGeocoder: function (result, status) {
        if (status === 'OK') {
            var latlng = result[0].geometry.location;
            var lat = latlng.lat();
            var lng = latlng.lng();
            var formatted_address = result[0].formatted_address; 
            var center = { 
                    lat: lat,
                    lng: lng
                };

            Client.set('formatted_address', formatted_address);
            Location.set({ 'center': center, 'contained_in': 'radius' });
            
        } else if (status === 'ZERO_RESULTS') {
            alert('We could not find a location named ' + this.query + '. To search for a restaurant, click on the "Find a Restaurant" link.');
        } else {
            alert('There was a problem with your request. Please try again.');
        }          
        
        // if (Backbone.history.fragment !== '') {
        //     var params = _.extend(Location.predicate(), Filter.predicate(), Client.predicate());
        //     App.navigate('/' + '?' + encodeURIComponent($.param(params)), { trigger: true });
        // }
    }

}))();
    