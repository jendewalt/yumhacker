FollowedEndorsersListView = Backbone.View.extend({
    
    initialize: function () {
        this.collection = new FollowedEndorserCollection();
        this.listenTo(this.collection, 'reset', this.render);

        this.collection.reset(this.model.get('endorsing_users'))
    },

    render: function () {
        this.$el.html('');
        if (this.collection.length > 0) {
            this.$el.html(render('establishments/followed_endorser_list', this.model));

            this.collection.each(function (user) {
                this.renderUser(user);
            }, this);
        }
    },

    renderUser: function (user) {
        var user_view = new FollowedEndorserView({
            tagName: 'li',
            model: user
        });

        if (user.id !== CurrentUser.id) {
            this.$('.endorsers_list').append(user_view.el);
        }
    }
});
