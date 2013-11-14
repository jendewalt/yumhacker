MainIndexMapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();
		this.markers = [];
		this.infoWindow = new google.maps.InfoWindow();
	},

	render: function () {
		this.$el.html('');
		this.$el.html(render('main/index_map'));

		var mapOptions = new GoogleMap().get('options');
		this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        this.listenTo(this.collection, 'reset', this.resetMarkers);			
	},

	resetMarkers: function () {
		if (this.markers.length) {
			this.clearMarkers();
		}

		this.collection.each(function (establishment) {
			this.renderMarker(establishment, this.map);
		}, this);		
	},

	clearMarkers: function () {
		_.each(this.markers, function (marker) {
			marker.setMap(null);
		});

		this.markers = [];
	},

	renderMarker: function (establishment, map) {
		var that = this;
		var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
		var marker = new google.maps.Marker({
			map: map,
			position: position,
			title: establishment.get('name')
		});

		google.maps.event.addListener(marker, 'click', function () {
			var content = establishment.get('name') + '<br>' + establishment.get('formatted_address');
			that.infoWindow.setContent(content);
			that.infoWindow.open(map, this);
		});

		this.markers.push(marker);
	},

	setMapCenter: function (lat, lng) {
		this.map.setCenter(new google.maps.LatLng(lat, lng));
	}
});
