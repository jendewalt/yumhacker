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

        google.maps.event.addListener(this.marker, 'click', function () {
            App.navigate('establishments/' + that.get('id'), { trigger: true });
        });
    },

    remove: function () {
        this.marker.setMap(null);
    }
});
