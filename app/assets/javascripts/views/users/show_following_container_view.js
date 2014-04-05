UsersShowFollowingContainerView = Backbone.View.extend({
    events: {
        'click a.tab': 'navigate'
    },

    initialize: function (options) {
        if (options.section === 'following') {
            this.renderFollowedUsers();
            this.changeHeadInfo('following');
        } else if (options.section === 'followers') {
            this.renderFollowers();
            this.changeHeadInfo('followers');
        } else if (options.section === 'favorites') {
            this.renderFavorites();
            this.changeHeadInfo('favorites');
        } else {
            this.renderYumLists();
            this.changeHeadInfo('lists');
        }
    },

    renderYumLists: function () {
        var yumLists = new ListsCollection();
        yumLists.where = { user_id: this.model.get('id') };
        yumLists.order = [{ type: 'desc'}, { updated_at: 'desc' }];
        
        this.listsIndexListContainerView = new UsersShowListsIndexListContainerView({
            el: this.$el,
            model: this.model,
            collection: yumLists
        });
    },
    
    renderFavorites: function () {
        var favoriteLists = new ListsCollection();
        favoriteLists.where =  { favoritizations: { user_id: this.model.get('id') }};
        favoriteLists.order = { updated_at: 'desc'};
        
        this.listsIndexListContainerView = new UsersShowListsIndexListContainerView({
            el: this.$el,
            model: this.model,
            collection: favoriteLists
        });
    },

    renderFollowedUsers: function (e) {
        this.followedUsersIndexListContainerView = new FollowedUsersIndexListContainerView({
            el: this.$el,
            model: this.model
        });        

    },

    renderFollowers: function (e) {
        this.followersIndexListContainerView = new FollowersIndexListContainerView({
            el: this.$el,
            model: this.model
        });

    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    },

    changeHeadInfo: function (section) {
        var user_name = this.model.get('full_name');
        var user_location = this.model.get('location') ? ' from ' + this.model.get('location') : '';
        var section_text

        if (section === 'following') {
            section_text = this.model.get('num_followed_users') !== 1 ? ' is following ' + this.model.get('num_followed_users') + ' people' : ' is following 1 person';
        } else if (section === 'followers') {
            section_text = this.model.get('num_followers') !== 1 ? ' has ' + this.model.get('num_followers') + ' followers' : ' has 1 follower';
        }  else if (section === 'favorites') {
            section_text = this.model.get('num_favorites') !== 1 ? ' has ' + this.model.get('num_favorites') + ' favorited lists.' : ' has 1 favorited list.';
        } else {
            section_text = this.model.get('num_lists') !== 1 ? ' has made ' + this.model.get('num_lists') + ' Yum Lists.' : ' has made one Yum List';            
        }

        this.title = user_name + ' | ' + capitalize(section) + ' | YumHacker';

        this.description = user_name + user_location + section_text + ' on YumHacker.'

        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
    }
});
