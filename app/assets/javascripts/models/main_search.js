MainSearch = new (Backbone.Model.extend({
    defaults: {
        lat: 37.7749295,
        lng: -122.4194155,
        radius: 5,
        from_followed: false,
        location_name: 'San Francisco, CA'        
    },

    initialize: function () {
        if ($.cookie('main_search')) {
            this.set(JSON.parse($.cookie('main_search')));
        }
        this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('main_search', JSON.stringify(this.attributes), { path: '/' });
    },

    predicate: function () {
        var data = {
            lat: this.get('lat'),
            lng: this.get('lng'),
            radius: this.get('radius'),
            from_followed: this.get('from_followed')
        };
        return data;
    }

}))();