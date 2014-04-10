UsersShowFollowersContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new FollowersCollection();
        
        this.listenTo(this.model, 'render:followers', this.fetchCollection);
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
        var followers = this.model.get('tabs_data').followers.count === 1 ? this.model.get('tabs_data').followers.count + ' follower' : this.model.get('tabs_data').followers.count + ' followers'

        this.title = user_name + ' | Followers | YumHacker';

        this.description = user_name + user_location + ' has ' + followers + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
