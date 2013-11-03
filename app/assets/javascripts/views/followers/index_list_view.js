FollowersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowersCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html(render('followers/index_follower_list'));
        this.collection.each(function (user){
            this.renderUser(user);
        }, this);
    },

    renderUser: function (user) {
        var user_view = new FollowersIndexUserView({
            tagName: 'li',
            model: user
        });

        this.$('ul.followers').append(user_view.el);
    }
});
