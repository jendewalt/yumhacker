UsersShowView = Backbone.View.extend({
    
    initialize: function () {
        this.render()

        new UsersShowUserView({
            el: '.user_model_container',
            model: this.model
        });

        new UsersShowFollowingContainerView({
            el: '.following_container',
            model: this.model            
        });      
    },

    render: function () {
        this.$el.html(render('users/show'));
    }
});
