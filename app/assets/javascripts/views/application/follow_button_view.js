ApplicationFollowButtonView = Backbone.View.extend({
    events: {
        'click .follow_btn': 'toggleFollowing'
    },

    initialize: function (options) {
        if (options.user_id != CurrentUser.get('id')){
            this.model = new FollowButton();
            this.listenTo(this.model, 'sync', this.render);
            this.listenTo(this.model, 'change', this.render);
            this.model.set('user_id', options.user_id, { silent: true });
            this.model.fetch({ data: { user_id: this.model.get('user_id') }});            
        }    
    },

    render: function () {
        this.$el.html(render('application/follow_button', this.model));
    },

    toggleFollowing: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
