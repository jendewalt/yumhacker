UsersShowUserView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.model.fetch();
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
        this.$el.html(render('users/show_user', this.model));

        if (this.model.get('id') != CurrentUser.get('id')) {
            this.application_follow_button_view = new ApplicationFollowButtonView({ 
                el: this.$('.follow_btn_container'),
                user: this.model 
            });
        }
    }
});
