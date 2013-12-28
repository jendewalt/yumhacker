ApplicationFollowButtonView = Backbone.View.extend({
    events: {
        'click .follow_btn': 'toggleFollowing'
    },

    initialize: function (options) {
        console.log(options)
        if (options.user.get('id') != CurrentUser.get('id')){
            this.model = new FollowButton();
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'change', this.render);

            this.listenTo(this.model, 'all', function (e) {
                console.log(e)
            });

            this.model.set({ 'user_id': options.user.get('id'), 'following': options.user.get('following') }, { silent: true });
            this.render();
        }    
    },

    render: function () {
        console.log(this.model)
        this.$el.html(render('application/follow_button', this.model));
    },

    toggleFollowing: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
