UsersShowFollowableView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
        this.listenTo(this.collection, 'paginate', this.paginate);
    },

    render: function () {
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(this.renderUser, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('followers/index_no_results', this.model));
        }
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user,
            className: 'user'
        });
        
        this.$el.append(user_view.el);        
    },

    paginate: function (e) {
        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id'), page: e } });
    }
});
