HomePageSignedInUserInfoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('home_page/signed_in_user_info'));
    }
});
