MainIndexMapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();
		this.markers = [];
	},

	render: function () {
		this.$el.html('');
		this.$el.html(render('main/index_map'));
		var that = this;
		var mapOptions = new GoogleMap().get('options');
		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		// google.maps.event.addListener(map, 'zoom_changed', function () {
		// 	that.changeRadius(map);
		// });
		
		this.collection.each(function (establishment) {
			this.renderMarker(establishment, map);
		}, this);
	},

	renderMarker: function (establishment, map) {
		var infoWindow = new google.maps.InfoWindow();
		var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
		var marker = new google.maps.Marker({
			map: map,
			position: position
		});
		console.log(establishment.get('name'));

		google.maps.event.addListener(marker, 'click', function () {
			var content = establishment.get('name') + '<br>' + establishment.get('formatted_address');
			infoWindow.setContent(content);
			infoWindow.open(map, this);
		});
	},

	changeRadius: function (map) {
		// var bounds = map.getBounds();
		// var center = bounds.getCenter();
		// var corner = bounds.getNorthEast();
		// // r = radius of the earth in km
		// var R = 6371.0;  

		// // Convert lat/lng from decimal degrees into radians
		// var lat1 = center.lat() * (Math.PI/180); 
		// var lng1 = center.lng() * (Math.PI/180);
		// var lat2 = corner.lat() * (Math.PI/180);
		// var lng2 = corner.lng() * (Math.PI/180);

		// var dLat = lat2 - lat1;
		// var dLng = lng2 - lng1;

		// var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  //  				Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
  //   			Math.sin(dLng/2) * Math.sin(dLng/2)

		// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  // 		var distance = R * c * 1000; // Distance in m
		// console.log(distance)
				
		// MainIndexView.radius = distance;
		// this.collection.fetch({ reset: true, data: { lat: center.lat(), lng: center.lng(), from_followed: MainIndexView.fromFollowed, radius: distance } });		
	}
});
