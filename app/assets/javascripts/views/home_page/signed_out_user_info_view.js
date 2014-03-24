HomePageSignedOutUserInfoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('home_page/signed_out_user_info'));
    }
});
