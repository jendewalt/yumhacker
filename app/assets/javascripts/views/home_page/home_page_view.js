HomePageView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();

        this.collection = new ListsCollection();
        this.collection.order = { updated_at: 'desc'};

        this.create_list_view = new HomePageCreateListView({
            el: '#create_list_container'
        });

        if (CurrentUser.logged_in()) {
            this.user_view = new HomePageSignedInUserInfoView({
                el: '#home_page_user_info_container'
            });            
        } else {
            this.user_view = new HomePageSignedOutUserInfoView({
                el: '#home_page_user_info_container'
            }); 
        }

        this.featured_list_view = new HomePageFeaturedView({
            el: '#featured_container'
        });

        this.lists_view = new HomePageListsView({
            el: '#home_page_lists',
            collection: this.collection
        });

        this.pagination_view = new ListsShowPaginationView({
            el: '.pagination_container',
            collection: this.collection
        });

        this.listenTo(Client, 'change', this.changeHeadInfo);
        this.changeHeadInfo();
    },

    render: function () {
        this.$el.html(render('home_page/home_page'));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    },

    changeHeadInfo: function (include_category) {
        this.title = 'YumHacker | Find restaurants recommended by people you trust | ' + Client.get('formatted_address');

        this.description = 'Find and share the best restaurants and bars in ' + Client.get('formatted_address') + ' recommended by people you trust. Create lists of your favorite restaurants to share and see what places other foodies think are the best. Get restaurant and bar photos, reviews, hours and more!';
        
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);            
    }
});
