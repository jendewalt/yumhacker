FollowedUsersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.collection.each(function (user){
            this.renderUser(user);
        }, this);
    },

    renderUser: function (user) {
        var user_view = new FollowedUsersIndexUserView({
            tagName: 'li',
            model: user
        });

        this.$el.append(user_view.el);
    }
});
