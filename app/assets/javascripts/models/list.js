List = Backbone.Model.extend({
    urlRoot: '/api/lists',

    initialize: function () {
        this.on('sync', this.format_time);
        this.listings = new ListingsCollection();
        this.listings.url = '/api/lists/' + this.id + '/listings';
    },

    format_time: function () {
        var raw_time = new Date(this.get('created_at'));
        var formatted_time = moment(raw_time).format('MMM Do YYYY');
        this.set('formatted_time', formatted_time);
    }
});
