FollowersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowersCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html(render('followers/index_follower_list', this.model));

        if (this.collection.length > 0) {
            this.$('ul.followers').html('');

            this.collection.each(function (user){
                this.renderUser(user);
            }, this);
        }
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user
        });
        
        if (this.model.get('id') != user.id) {
            this.$('ul.followers').append(user_view.el);
        }
    }
});
