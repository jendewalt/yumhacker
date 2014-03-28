User = Backbone.Model.extend({
	urlRoot: '/api/users',

    initialize: function () {
        this.on('sync', this.assignUrls);
    },

    assignUrls: function () {
        this.set('url', '/' + this.get('path'));
        this.set({
            'lists_url': this.get('url') + '/lists',
            'following_url': this.get('url') + '/following',
            'followers_url': this.get('url') + '/followers'
        });
    }
});
