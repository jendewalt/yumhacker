GoogleMap = Backbone.Model.extend({
	defaults: {
        
        options: {
            center: new google.maps.LatLng(37.7749295, -122.4194155),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    }
});
