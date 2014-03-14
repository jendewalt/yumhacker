ContactView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    title: 'Contact | YumHacker',

    description: 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

    initialize: function () {
        this.render();
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/contact'));
        window.scrollTo(0,0);
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
