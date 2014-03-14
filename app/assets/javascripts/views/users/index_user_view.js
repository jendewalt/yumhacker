UsersIndexUserView = Backbone.View.extend({
    events:{
        'click a.user': 'navigate'
    },

    initialize: function () {
        this.render();

        this.application_follow_button_view = new ApplicationFollowButtonView({ 
            el: this.$('.follow_btn_container'),
            user: this.model 
        });
        this.listenTo(this.model, 'remove', this.remove);
    },
    
    render: function () {
        this.$el.html(render('users/index_user', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});
