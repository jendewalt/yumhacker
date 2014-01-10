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
        this.$el.html(render('followers/index_followers_list', this.model));

        if (this.collection.length > 0) {
            this.$('ul.followers').html('');

            this.collection.each(function (user){
                this.renderUser(user);
            }, this);
        } else {
            this.$el.html(render('followers/index_no_results', this.model));
        }
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user
        });
        
        this.$('ul.followers').append(user_view.el);
    }
});
