Filter = new (Backbone.Model.extend({
    defaults: {
        radius: 5,
        from_followed: false   
    },

    initialize: function () {
        if ($.cookie('filter')) {
            this.set(JSON.parse($.cookie('filter')));
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