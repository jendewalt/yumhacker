MapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		var center = Location.get('center');
		this.markers = [];
		this.mapOptions = {
            scrollwheel: false,
            panControl: false,
            center: new google.maps.LatLng(center.lat, center.lng),
            zoom: Client.get('zoom'),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		this.mapCanvas = this.$el;
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
		this.addGoogleListeners();
	},

	render: function () {
		console.log(Location.get('contained_in'))
		this.listen_to_map = false;
		this.resetMarkers();

		if (Location.get('contained_in') === 'bounds') {
			var center = Location.get('center');

			this.map.setZoom(Client.get('zoom'));
			this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
		} else {
			var markerBounds = new google.maps.LatLngBounds();

			_.each(this.markers, function (marker) {
				markerBounds.extend(marker.marker.position)
			});

			this.map.fitBounds(markerBounds);
		}
		this.listen_to_map = true;
	},

	resetMarkers: function () {
		if (this.markers.length) {
			this.clearMarkers();
		}

		this.collection.each(function (establishment, i) {
			this.renderMarker(establishment, i);
		}, this);
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

		this.markers.push(marker);
	},

	// renderEstablishmentMap: function () {
	// 	// this.clearMarkers();
	// 	$('.map_canvas_container').html('');
	// 	this.mapCanvas.appendTo($('.map_canvas_container'));
		
	// 	this.map.setCenter(new google.maps.LatLng(this.model.get('lat'), this.model.get('lng')));
	// 	this.map.setZoom(17);

	// 	this.renderMarker(this.model, 10);
	// },

	addGoogleListeners: function () {
		var that = this;
		this.map.addListener('dragstart', function (e) {
			if (Client.get('redo_search') && that.listen_to_map) {
				google.maps.event.addListenerOnce(that.map, 'idle', function (e) {
					console.log('Dragend');

					var google_bounds = that.map.getBounds()
					var bounds = {
						ne: {
							lat: google_bounds.getNorthEast().lat(),
							lng: google_bounds.getNorthEast().lng()
						},
						sw: {
							lat: google_bounds.getSouthWest().lat(),
							lng: google_bounds.getSouthWest().lng()
						}
					};
					var center = {
						lat: google_bounds.getCenter().lat(),
						lng: google_bounds.getCenter().lng()
					};

					Client.set('zoom', that.map.getZoom());
					Location.set({ center: center, bounds: bounds, contained_in: 'bounds' });
				});
			}
		});

		this.map.addListener('zoom_changed', function (e) {
			if (Client.get('redo_search') && that.listen_to_map) {	
				console.log('Zoom Changed');
	
				var google_bounds = that.map.getBounds()
				var bounds = {
					ne: {
						lat: google_bounds.getNorthEast().lat(),
						lng: google_bounds.getNorthEast().lng()
					},
					sw: {
						lat: google_bounds.getSouthWest().lat(),
						lng: google_bounds.getSouthWest().lng()
					}
				};
				var center = {
					lat: google_bounds.getCenter().lat(),
					lng: google_bounds.getCenter().lng()
				};

				Client.set('zoom', that.map.getZoom());
				Location.set({ center: center, bounds: bounds, contained_in: 'bounds' });
			}
		}); 
	}
});
