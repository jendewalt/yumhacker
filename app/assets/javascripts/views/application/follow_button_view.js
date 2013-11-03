ApplicationFollowButtonView = Backbone.View.extend({
    events: {
        'click .follow_btn': 'toggleFollowing'
    },

    initialize: function (options) {
        console.log('instantiated: ' + options.user_id)
        this.model = new FollowButton();
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({ data: { user_id: options.user_id }});
    },

    render: function () {
        console.log(this.model)
        this.$el.html(render('application/follow_button', this.model));
    },

    toggleFollowing: function (e) {
        e.preventDefault();
        console.log(e);
    }
});
