UsersIndexUserView = Backbone.View.extend({
    events:{
        'click .user_name': 'goToUserShow'
    },

    initialize: function () {
        this.render();
        this.application_follow_button_view = new ApplicationFollowButtonView({ 
            el: this.$('.follow_btn_container'),
            user_id: this.model.get('id') 
        });
        this.listenTo(this.model, 'remove', this.remove);
    },
    
    render: function () {
        this.$el.html(render('users/index_user', this.model));
    },

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('id'), { trigger: true });
    }
});
