MapMarker = Backbone.Model.extend({
	initialize: function (establishment, map) {
        // var that = this;
        var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
        this.marker = new google.maps.Marker({
            map: map,
            position: position,
            title: establishment.get('name')
        });

        google.maps.event.addListener(this.marker, 'click', function () {
            // Marker has same id as establishment...?
            App.navigate('establishments/' + establishment.get('id'), { trigger: true });
        });
    },

    remove: function () {
        this.marker.setMap(null);
    }
});
