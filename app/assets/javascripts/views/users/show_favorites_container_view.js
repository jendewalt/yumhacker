UsersShowFavoritesContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new ListsCollection();
        this.collection.where = { favoritizations: { user_id: this.model.get('id') }};
        this.collection.order = { updated_at: 'desc' };

        this.listenTo(this.model, 'render:favorites', this.fetchCollection);
        this.listenTo(this.collection, 'reset', this.render);
    },

    fetchCollection: function () {
        this.collection.fetch({ reset: true, data: this.collection.predicate() });
    },

    render: function () {
        this.changeHeadInfo();
        
        this.$el.html(render('users/show_stuff'));

        this.list_index_list = new UsersShowFavoritesView({
            el: this.$('ul'),
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: this.$('.pagination_container'),
            collection: this.collection
        });
        this.pagination_view.render();
    },

    changeHeadInfo: function () {
        var user_name = this.model.get('full_name');
        var user_location = this.model.get('location') ? ' from ' + this.model.get('location') : '';
        var favorites = this.model.get('tabs_data').favorites.count === 1 ? this.model.get('tabs_data').favorites.count + ' Favorite list' : this.model.get('tabs_data').favorites.count + ' Favorite lists'

        this.title = user_name + ' | Favorites | YumHacker';

        this.description = user_name + user_location + ' has ' + favorites + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
