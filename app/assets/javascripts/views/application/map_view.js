MapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();
		this.markers = [];
		this.infoWindow = new google.maps.InfoWindow({ maxWidth: 200 });
	},

	render: function () {
		this.$el.html('');
		this.$el.html(render('application/map'));

		var mapOptions = new GoogleMap().get('options');
		this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        this.listenTo(this.collection, 'reset', this.resetMarkers);			
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
});
