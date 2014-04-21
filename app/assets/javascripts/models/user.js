User = Backbone.Model.extend({
	urlRoot: '/api/users',

    initialize: function () {
        // TODO: this could probably be better managed
        this.on('sync', this.validateWebsite);
        this.on('sync', this.assignUrls);
    },

    assignUrls: function () {
        this.set('url', '/' + this.get('path'));
        this.set({
            'lists_url': this.get('url') + '/lists',
            'favorites_url': this.get('url') + '/favorites',
            'following_url': this.get('url') + '/following',
            'followers_url': this.get('url') + '/followers'
        });
    },

    validateWebsite: function () {
        var website = this.get('website');
        if (website) {
            if (!website.match(/^http:\/\//) && !website.match(/^https:\/\//)) {
                this.set('website', 'http://' + website);
            }
        }
    }
});
