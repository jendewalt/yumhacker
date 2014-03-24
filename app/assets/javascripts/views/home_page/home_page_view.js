HomePageView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

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

        // this.lists_view = new HomePageListsView({
        //     el: '#home_page_lists_container'
        // });

    },

    render: function () {
        this.$el.html(render('home_page/home_page'));
    }

    // changeHeadInfo: function (include_category) {
    //     var location = Client.get('formatted_address');
    //     var category = include_category ? Filter.get('category_name') + ' ' : '';

    //     if (location !== 'Current Location') {
    //         this.title = 'YumHacker | Find ' + category + 'restaurants endorsed by people you trust | ' + Client.get('formatted_address');

    //         this.description = 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!';

    //         App.eventAggregator.trigger('domchange:title', this.title);
    //         App.eventAggregator.trigger('domchange:description', this.description);            
    //     }
    // }
});
