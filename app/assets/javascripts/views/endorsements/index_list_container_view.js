EndorsementsIndexListContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new EndorsementCollection();
        this.render();
    },

    render: function () {
        this.$el.html(render('endorsements/index_endorsement_list_container', this.model));

        this.endorsementsIndexListView = new EndorsementsIndexListView({
            el: 'ul.endorsements',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
    }
});
