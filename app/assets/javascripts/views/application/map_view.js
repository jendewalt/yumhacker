MapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		console.log('map initialized')
		this.markers = [];
		this.mapOptions = {
            scrollwheel: false,
            center: new google.maps.LatLng(37.7749295, -122.4194155),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		this.mapCanvas = this.$el;
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
		this.addGoogleListeners();
		xxx = this.map;
	},

	render: function () {
		console.log('render the map')

		this.listen_to_map = false;
		this.resetMarkers();

		if (Filter.get('bounds') && Filter.get('redo_search')) {
			console.log('fit map to bounds')
			var center = Filter.get('bounds').center;

			this.map.setZoom(Filter.get('zoom'));
			this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
		} else {
			markerBounds = new google.maps.LatLngBounds();

			_.each(this.markers, function (marker) {
				console.log(marker.marker.position)
				markerBounds.extend(marker.marker.position)
			});

		 	console.log('fitting to markers')
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
			if (Filter.get('redo_search') && that.listen_to_map) {
				google.maps.event.addListenerOnce(that.map, 'idle', function (e) {
					console.log('Map dragend and idle');

					var position = { 
						bounds: that.map.getBounds(), 
						zoom: that.map.getZoom()
					};

					Filter.setPosition(position);
				});
			}
		});

		this.map.addListener('zoom_changed', function (e) {
			if (Filter.get('redo_search') && that.listen_to_map) {	
				console.log('Map zoom change');

				var position = { 
					bounds: that.map.getBounds(), 
					zoom: that.map.getZoom()
				};
				Filter.setPosition(position);
			}
		}); 
	}
});
