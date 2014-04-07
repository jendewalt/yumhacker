UsersShowFavoritesView = Backbone.View.extend({
    events: {
    },
        
    initialize: function () {
        this.render();
        this.listenTo(this.collection, 'paginate', this.paginate);
    },

    render: function () {
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(this.renderList, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('users/show_lists_index_list_no_results', this.model));
        }
    },

    renderList: function (list) {
        var list_item = new ListsIndexListView({
            tagName: 'li',
            model: list
        });

        this.$el.append(list_item.el);            
    },

    paginate: function (e) {
        var params = _.extend(this.collection.predicate(), { page: e });
        this.collection.fetch({ reset: true, data: params });
    }
});
