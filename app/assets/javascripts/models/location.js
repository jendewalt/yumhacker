Location = new (Backbone.Model.extend({
    defaults: {
        center: {
            lat: 37.7749295,
            lng: -122.4194155
        },
        radius: 50,
        contained_in: 'radius' // 'radius' for search, 'bounds' for map
    },

    parseParams: function () {
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));

        if (params.location) {
            if (params.location.center) {
                params.location.center.lat = Number(params.location.center.lat);
                params.location.center.lng = Number(params.location.center.lng);
            }
            if (params.location.radius) {
                params.location.radius = Number(params.location.radius);
            }
            if (params.location.bounds) {
                if (params.location.bounds.ne) {
                    params.location.bounds.ne.lat = Number(params.location.bounds.ne.lat);
                    params.location.bounds.ne.lng = Number(params.location.bounds.ne.lng);
                }
                if (params.location.bounds.sw) {
                    params.location.bounds.sw.lat = Number(params.location.bounds.sw.lat);
                    params.location.bounds.sw.lng = Number(params.location.bounds.sw.lng);
                }
            }
            if (_.isEmpty(params.location.bounds)) delete params.location.bounds;
            this.set(params.location, { silent: true });
        }
    },

    predicate: function () {
        return {
            location: {
                center: this.get('center'),
                radius: this.get('radius'),
                bounds: this.get('bounds'),
                contained_in: this.get('contained_in')
            }
        };
    }
}))();
