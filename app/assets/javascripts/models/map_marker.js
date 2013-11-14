MapMarker = Backbone.Model.extend({
	initialize: function (establishment, map, infoWindow) {
        var that = this;
        var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
        this.marker = new google.maps.Marker({
            map: map,
            position: position,
            title: establishment.get('name')
        });

        google.maps.event.addListener(this.marker, 'mouseover', function () {
            var content = establishment.get('name') + '<br>' + establishment.get('formatted_address');
            infoWindow.setContent(content);
            infoWindow.open(map, this);
        });
    },

    remove: function () {
        this.marker.setMap(null);
    }
});
