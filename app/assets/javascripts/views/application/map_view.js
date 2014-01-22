MapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.markers = [];
		this.mapOptions = new GoogleMapModel().get('options');
		this.mapCanvas = this.$el;
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
	},

	render: function () {
		console.log('render the map')
		// this.clearMarkers();
		this.removeGoogleListeners();
		xxx = this.map;
		if (Filter.get('bounds') && Filter.get('redo_search')) {
			var center = Filter.get('bounds').center;

			this.map.setZoom(Filter.get('zoom'));
			this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
		} else {
			this.map.setCenter(new google.maps.LatLng(MainSearch.get('lat'), MainSearch.get('lng')));			
		}
		this.addGoogleListeners();
		this.resetMarkers();
	},

	resetMap: function () {
		$('.map_canvas_container').html('');
		this.mapCanvas.appendTo($('.map_canvas_container'));
		this.render();
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

	renderEstablishmentMap: function () {
		// this.clearMarkers();
		$('.map_canvas_container').html('');
		this.mapCanvas.appendTo($('.map_canvas_container'));
		
		this.map.setCenter(new google.maps.LatLng(this.model.get('lat'), this.model.get('lng')));
		this.map.setZoom(17);

		this.renderMarker(this.model, 10);
	},

	addGoogleListeners: function () {
		var that = this;
		this.map.addListener('dragend', function (e) {
			console.log('Map dragend')
			var position = { 
				bounds: that.map.getBounds(), 
				zoom: that.map.getZoom()
			};
			that.trigger('bounds_changed', position);
		});

		this.map.addListener('zoom_changed', function (e) {
			console.log('Map zoom change')
			var position = { 
				bounds: that.map.getBounds(), 
				zoom: that.map.getZoom()
			};
			that.trigger('bounds_changed', position);
		}); 
	},

	removeGoogleListeners: function () {
		google.maps.event.clearListeners(this.map, 'dragend');
		google.maps.event.clearListeners(this.map, 'zoom_changed'); 
	}
});
