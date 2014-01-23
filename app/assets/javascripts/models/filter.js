Filter = new (Backbone.Model.extend({
    defaults: {
        following_filter: 'all',
        redo_search: true 
    },

    initialize: function () {
        if ($.cookie('filter')) {
            this.set(JSON.parse($.cookie('filter')));
        }
        var params = $.deparam(window.location.search.slice(1));

        if (typeof params.radius != 'undefined') this.set('radius', params.radius);
        if (typeof params.following_filter != 'undefined') {
               this.set('following_filter', params.following_filter);
        }

        // this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('filter', JSON.stringify(this.attributes), { path: '/' });
    },

    setPosition: function (position) {
        var bounds = position.bounds;
        var zoom = position.zoom;
        this.set({
            bounds: {
                ne: {
                    lat: bounds.getNorthEast().lat(),
                    lng: bounds.getNorthEast().lng()
                },
                sw: {
                    lat: bounds.getSouthWest().lat(),
                    lng: bounds.getSouthWest().lng()
                },
                center: {
                    lat: bounds.getCenter().lat(),
                    lng: bounds.getCenter().lng()
                }
            },
            zoom: zoom
        }, { silent: true });
        this.trigger('map_change');
    },

    predicate: function () {
        var data = {
            following_filter: this.get('following_filter'),
            bounds: this.get('bounds'),
            zoom: this.get('zoom')
        };
        return data;
    }

}))();
