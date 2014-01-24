EstablishmentMapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.markers = [];
		this.mapOptions = {
            scrollwheel: false,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
		this.mapCanvas = this.$el;
		this.map = new google.maps.Map(this.mapCanvas[0], this.mapOptions);
	},

	render: function () {
		this.map.getStreetView().setVisible(false);
		this.clearMarkers();
		$('.map_canvas_container').html('');
		this.mapCanvas.appendTo($('.map_canvas_container'));
		
		this.map.setCenter(new google.maps.LatLng(this.model.get('lat'), this.model.get('lng')));
		this.map.setZoom(16);

		this.renderMarker(this.model, 10);
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

});
