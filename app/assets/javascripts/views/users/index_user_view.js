UsersIndexUserView = Backbone.View.extend({
    events:{
        // 'click': 'goToUserShow'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('users/index_user', this.model));
    }
});
