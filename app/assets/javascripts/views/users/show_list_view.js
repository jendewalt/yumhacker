UsersShowListView = Backbone.View.extend({
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
        var list_model = list;

        list_model = list_model.clone().set('show_description', true);

        var desc = list_model.get('description');
        if (desc !== null && desc.length > 105) {
            list_model.set('description', desc.slice(0, 105) + '...');
        }       

        var list_view = new ListsIndexListView({
            tagName: 'li',
            model: list_model
        });

        if (list.get('type') === 'WishList') {
            this.$el.prepend(list_view.el);
        } else {
            this.$el.append(list_view.el);            
        }
    },

    paginate: function (e) {
        var params = _.extend(this.collection.predicate(), { page: e });
        this.collection.fetch({ reset: true, data: params });
    }
});
