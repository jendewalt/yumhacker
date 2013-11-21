MapMarker = Backbone.Model.extend({
	initialize: function (establishment, map, number) {
        var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
        var marker_sprite_offset = 28;
        var marker_sprite_offset = number * 28;

        this.marker = new google.maps.Marker({
            map: map,
            position: position,
            title: establishment.get('name'),
            icon: {
                origin: new google.maps.Point(marker_sprite_offset, 0),
                size: new google.maps.Size(28, 40),
                url: 'http://i1324.photobucket.com/albums/u608/jenniferdewalt/dev/map_markers_zps7922e161.png'
            }
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
