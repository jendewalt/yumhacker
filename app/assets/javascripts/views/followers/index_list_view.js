FollowersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowersCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html('');
        this.collection.each(function (user){
            this.renderUser(user);
        }, this);
    },

    renderUser: function (user) {
        var user_view = new FollowersIndexUserView({
            tagName: 'li',
            model: user
        });

        this.$el.append(user_view.el);
    }
});
