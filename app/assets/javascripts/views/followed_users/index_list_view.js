FollowedUsersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowedUsersCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('followed_users/index_followed_users_list', this.model));

        if (this.collection.length > 0) {
            this.$('ul.followed_users').html('');
            
            this.collection.each(function (user){
                this.renderUser(user);
            }, this);
        } else {
            this.$el.html(render('followed_users/index_no_results', this.model));
        }
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user
        });

        this.$('ul.followed_users').append(user_view.el);        
    }
});