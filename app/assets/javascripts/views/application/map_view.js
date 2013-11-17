MapView = new (Backbone.View.extend({
	events: {
	},

	initialize: function () {
		console.log('Init: google map')
		this.markers = [];
		this.infoWindow = new google.maps.InfoWindow({ maxWidth: 200 });
		this.mapOptions = new GoogleMap().get('options');
		this.mapCanvas = $('<div>', {
			id: 'map_canvas'
		});
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
	},

	render: function () {
		this.mapCanvas.appendTo(this.el);
		google.maps.event.trigger(this.map, 'resize');
	},

	resetMap: function () {
		this.map.setCenter(new google.maps.LatLng(MainSearch.get('lat'), MainSearch.get('lng')));
	},

	resetMarkers: function () {
		if (this.markers.length) {
			this.clearMarkers();
		}

		this.collection.each(function (establishment) {
			this.renderMarker(establishment);
		}, this);		
	},

	clearMarkers: function () {
		_.each(this.markers, function (marker) {
			marker.remove();
		});

		this.markers = [];
	},

	renderMarker: function (establishment) {
		marker = new MapMarker(establishment, this.map, this.infoWindow);

		this.markers.push(marker);
	},

	setMapCenter: function (lat, lng) {
		this.map.setCenter(new google.maps.LatLng(lat, lng));
	}
}))();
