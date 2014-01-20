Filter = new (Backbone.Model.extend({
    defaults: {
        radius: 5,
        following_filter: 'all'   
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

        this.on('change', this.writeCookie, this);
    },

    writeCookie: function () {
        $.cookie('filter', JSON.stringify(this.attributes), { path: '/' });
    },

    predicate: function () {
        var data = {
            radius: this.get('radius'),
            following_filter: this.get('following_filter')
        };
        return data;
    }

}))();