UsersShowView = Backbone.View.extend({
    
    initialize: function (options) {
        this.section = options.section || 'lists';

        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
    },

    render: function () {
        this.$el.html(render('users/show'));
        
        this.users_show_user_view = new UsersShowUserView({
            el: '#user_model_container',
            model: this.model
        });

        this.listContainerView = new UsersShowListContainerView({
            el: '.lists_container',
            model: this.model
        });

        this.favoritesContainerView = new UsersShowFavoritesContainerView({
            el: '.lists_container',
            model: this.model
        });

        this.followedUserContainerView = new UsersShowFollowedUsersContainerView({
            el: '.lists_container',
            model: this.model
        });

        this.followersContainerView = new UsersShowFollowersContainerView({
            el: '.lists_container',
            model: this.model
        });
        
        var tabs_data = this.model.get('tabs_data');
        tabs_data[this.section].selected = true;

        this.tabs_view = new UsersShowTabsView({
            el: '#follow_tabs_container',
            model: this.model,
            tabs_data: tabs_data
        });

        this.model.trigger('render:' + this.section);
    }
});
