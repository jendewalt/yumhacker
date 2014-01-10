FollowersIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html('');

        if (this.collection.length > 0) {
            this.$('ul.followers').html('');

            this.collection.each(function (user){
                this.renderUser(user);
            }, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('followers/index_no_results', this.model));
        }
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user
        });
        
        this.$el.append(user_view.el);        
    },

    paginate: function (e) {
        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id'), page: e } });
    }
});
