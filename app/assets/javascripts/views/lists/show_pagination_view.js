ListsShowPaginationView = Backbone.View.extend({
    events: {
        'click a.page': 'navigate'
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
        this.$el.html(render('lists/pagination', this.collection)); 
    },

    navigate: function (e) {
        e.preventDefault();

        this.collection.requested_page = e.target.rel;
        this.collection.fetch({ reset: true, data: this.collection.predicate() });
        App.navigate(e.target.pathname + e.target.search, { trigger: false, replace: false });

        window.scrollTo(0,0);
    }
});
