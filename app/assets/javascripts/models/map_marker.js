MapMarker = Backbone.Model.extend({
	initialize: function (establishment, map, number) {
        var position = new google.maps.LatLng(establishment.get('lat'), establishment.get('lng'));
        var marker_width = 24;
        var marker_height = 34.286;
        var marker_sprite_offset = marker_width * number;

        this.marker = new google.maps.Marker({
            map: map,
            position: position,
            title: establishment.get('name'),
            icon: {
                origin: new google.maps.Point(marker_sprite_offset, 0),
                size: new google.maps.Size(marker_width, marker_height),
                url: 'http://i1324.photobucket.com/albums/u608/jenniferdewalt/dev/map_markers_zpsdd19adfe.png'
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
