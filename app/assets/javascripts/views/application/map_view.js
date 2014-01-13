MapView = new (Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.markers = [];
		this.mapOptions = new GoogleMap().get('options');
		this.mapCanvas = $('<div>', {
			id: 'map_canvas'
		});
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
	},

	render: function () {
		this.clearMarkers();
		this.mapCanvas.appendTo(this.el);
		google.maps.event.trigger(this.map, 'resize');
	},

	resetMap: function () {
		this.render();
		this.map.setCenter(new google.maps.LatLng(MainSearch.get('lat'), MainSearch.get('lng')));
		this.resetMarkers();
	},

	resetMarkers: function () {
		// Set the minimum bounds for the map
		var c = 1.0/(60 * 1.15078); // Convert miles to degrees
		var center_lat = MainSearch.get('lat');
		var center_lng = MainSearch.get('lng');
		var ne_lat = center_lat + (1/10) * c;
		var ne_lng = center_lng + (1/10) * c;
		var sw_lat = center_lat - (1/10) * c;
		var sw_lng = center_lng - (1/10) * c;
		var neBoundLatLng = new google.maps.LatLng(ne_lat, ne_lng);
		var swBoundLatLng = new google.maps.LatLng(sw_lat, sw_lng);
		this.bounds = new google.maps.LatLngBounds(swBoundLatLng, neBoundLatLng);

		if (this.markers.length) {
			this.clearMarkers();
		}

		this.collection.each(function (establishment, i) {
			this.renderMarker(establishment, i);
		}, this);

		this.map.fitBounds(this.bounds);		
	},

	clearMarkers: function () {
		_.each(this.markers, function (marker) {
			marker.remove();
		});

		this.markers = [];
	},

	renderMarker: function (establishment, i) {
		var myLatLng = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
		marker = new MapMarker(establishment, this.map, i);

		if (this.bounds) {
			this.bounds.extend(myLatLng);
		}

		this.markers.push(marker);
	},

	renderEstablishmentMap: function () {
		this.clearMarkers();
		this.mapCanvas.appendTo(this.el);
		google.maps.event.trigger(this.map, 'resize');

		this.map.setCenter(new google.maps.LatLng(this.model.get('lat'), this.model.get('lng')));
		this.map.setZoom(17);

		this.renderMarker(this.model, 10);
	}
}))();
