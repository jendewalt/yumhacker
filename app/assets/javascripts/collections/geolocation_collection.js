GeolocationCollection = Backbone.Collection.extend({
	model: Geolocation,

    url: '/api/geolocations'
});
