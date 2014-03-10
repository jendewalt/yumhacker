MainMapView = Backbone.View.extend({
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
		$(window).on('scroll', this.fixMapOnScroll);
	},

	render: function () {
		MainGoogleMap.map.getStreetView().setVisible(false);
		this.listen_to_map = false;
		this.resetMarkers();


		var that = this;
		google.maps.event.addListenerOnce(that.map, 'zoom_changed', function (e) {
			google.maps.event.addListenerOnce(that.map, 'idle', function (e) {
				that.listen_to_map = true;
			});
		});
		if (Location.get('contained_in') === 'bounds') {
			var center = Location.get('center');


			this.map.setZoom(Client.get('zoom'));
			this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
		} else {
			var markerBounds = new google.maps.LatLngBounds();
			var center = Location.get('center');
			
			if (this.markers.length	> 0) {
				_.each(this.markers, function (marker) {
					markerBounds.extend(marker.marker.position);
				});

				this.map.fitBounds(markerBounds);				
			} else {
				this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
				this.map.setZoom(13);
			}
		}
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
		var marker = new MapMarker(establishment, this.map, i);

		this.markers.push(marker);
	},

	addGoogleListeners: function () {
		var that = this;
		this.map.addListener('dragstart', function (e) {
			if (Client.get('redo_search') && that.listen_to_map) {
				google.maps.event.addListenerOnce(that.map, 'idle', function (e) {

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
	},

    fixMapOnScroll: function () {
    	if ($('#main_map_pane').length > 0) {
	        var left_column_height = $('.column.left').height();
	        var map = $('#main_map_pane');
	        var map_top = map.position().top;
	        var window_scroll_top = $(window).scrollTop();
    		
    		if (window_scroll_top >= left_column_height || window_scroll_top <= map_top) {
    			map.removeClass('sticky_map');
    		} else if (window_scroll_top >= map_top) {
    			if (!map.hasClass('sticky_map')) {
    				map.addClass('sticky_map');
    			}
    		}
    	}
    }
});
