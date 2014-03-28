UsersShowListsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);

        this.collection.fetch({ reset: true });
    },

    render: function () {
        console.log(this.collection)
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(function (list){
                this.renderList(list);
            }, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('users/show_lists_index_list_no_results', this.model));
        }
    },

    renderList: function (list) {
        var list_view = new UsersShowListView({
            tagName: 'li',
            model: list
        });
        this.$el.append(list_view.el);
    },

    paginate: function (e) {
        var data = { user_id: this.model.get('id'), page: e };
        this.collection.fetch({ reset: true, data: data });
    }
});
