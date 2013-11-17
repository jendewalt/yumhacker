UsersIndexView = Backbone.View.extend({
    
    initialize: function () {
        this.collection = new UserCollection();
        this.collection.fetch({ reset: true });
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
        this.$el.html(render('users/index'));

        this.users_index_list_view = new UsersIndexListView({
            el: '.users_list',
            collection: this.collection
        });
    }
});
