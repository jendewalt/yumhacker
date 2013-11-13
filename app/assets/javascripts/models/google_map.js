GoogleMap = Backbone.Model.extend({
	defaults: {
        
        options: {
            center: new google.maps.LatLng(37.7833, -122.4167),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    }
});
