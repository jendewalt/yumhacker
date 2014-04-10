UsersShowFollowedUsersContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowedUsersCollection();
        
        this.listenTo(this.model, 'render:following', this.fetchCollection);
        this.listenTo(this.collection, 'reset', this.render);
    },

    fetchCollection: function () {
        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.changeHeadInfo();

        this.$el.html(render('users/show_stuff'));

        this.followable_view = new UsersShowFollowableView({
            el: this.$('ul'),
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
        this.pagination_view.render();
    },

    changeHeadInfo: function () {
        var user_name = this.model.get('full_name');
        var user_location = this.model.get('location') ? ' from ' + this.model.get('location') : '';
        var following = this.model.get('tabs_data').following.count === 1 ? this.model.get('tabs_data').following.count + ' YumHacker' : this.model.get('tabs_data').following.count + ' YumHackers'

        this.title = user_name + ' | Following | YumHacker';

        this.description = user_name + user_location + ' is following ' + following + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
