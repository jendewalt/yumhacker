UsersSignInView = Backbone.View.extend({
    events: {
    },

    title: 'Sign In | YumHacker',

    description: 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

    initialize: function () {
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
