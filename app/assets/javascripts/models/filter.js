Filter = new (Backbone.Model.extend({
    defaults: {
        radius: 5,
        from_followed: false   
    },

    initialize: function () {
        if ($.cookie('filter')) {
            this.set(JSON.parse($.cookie('filter')));
        }
        var params = $.deparam(window.location.search.slice(1));

        if (typeof params.radius != 'undefined') this.set('radius', params.radius);
        if (typeof params.from_followed != 'undefined') {
            var from_followed = params.from_followed;
            var bool = !(from_followed !== 'true' && from_followed != true);
            this.set('from_followed', bool);
        }

        this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('filter', JSON.stringify(this.attributes), { path: '/' });
    },

    predicate: function () {
        var data = {
            radius: this.get('radius'),
            from_followed: this.get('from_followed')
        };
        return data;
    }

}))();