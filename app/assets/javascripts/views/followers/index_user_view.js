FollowersIndexUserView = Backbone.View.extend({
    events:{
        'click .user': 'goToUserShow'
    },

    initialize: function () {
        this.render();
        this.application_follow_button_view = new ApplicationFollowButtonView({ 
            el: this.$('.follow_btn_container'),
            user_id: this.model.get('id') 
        });
    },

    render: function () {
        this.$el.html(render('followers/index_follower', this.model));
    },

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('id'), { trigger: true });
    }
});
