HomePageListsView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        var params = this.collection.predicate();
        this.collection.fetch({ reset: true, data: params });
    },

    render: function () {
        this.$el.html('');
        this.collection.each(function (list) {
            this.renderList(list);
        }, this);    
    },

    renderList: function (list) {
        var list_view = new HomePageListView({
            tagName: 'li',
            model: list
        });

        this.$el.append(list_view.el);
    }
});
