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

        var tabs_data = this.model.get('tabs_data');
        tabs_data[this.section].selected = true;

        this.tabs_view = new UsersShowTabsView({
            el: '#follow_tabs_container',
            model: tabs_data
        });

        this.users_show_following_container = new UsersShowFollowingContainerView({
            el: '#following_list_container',
            model: this.model,
            section: this.section
        });
    }
});
