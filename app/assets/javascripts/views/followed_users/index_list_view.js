FollowedUsersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowedUsersCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html(render('followed_users/index_followed_user_list', this.model));

        if (this.collection.length > 0) {
            this.$('ul.followed_users').html('');
            
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
            this.$('ul.followed_users').append(user_view.el);
        }
        
    }
});