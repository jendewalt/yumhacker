HomePageListsView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true, data: this.collection.predicate() });
    },

    render: function () {
        this.$el.html('');
        this.collection.each(function (list) {
            this.renderList(list);
        }, this);    
    },

    renderList: function (list) {
        this.$el.append(new HomePageListView({
            tagName: 'li',
            model: list
        }).el);
    }
});
