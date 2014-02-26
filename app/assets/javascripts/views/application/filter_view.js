FilterView = Backbone.View.extend({
    events: {
        'click input:radio': 'toggleFollowingFilter',
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/filter'));

        this.filter_categories_list_view = new FilterCategoriesListView({
            el: this.$('#filter_categories_container')
        });            
    },

    toggleFollowingFilter: function (e) {
        Filter.set('relation', $(e.target).val());
    }
});