Comment = Backbone.Model.extend({
    urlRoot: '/api/comments',

    initialize: function () {
        this.on('sync', this.format_time);
    },

    format_time: function () {
        var raw_time = new Date(this.get('created_at'));
        var formatted_time = moment(raw_time).format('MMM Do YYYY, h:mm a');
        this.set('formatted_time', formatted_time);
    }
});
