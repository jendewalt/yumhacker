FollowersIndexUserView = Backbone.View.extend({
    events:{
        'click': 'goToUserShow'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('followers/index_follower', this.model));
    },

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('id'), { trigger: true });
    }
});
