HomePageSignedInUserInfoView = Backbone.View.extend({
    events:{
    },

    initialize: function () {
        // TODO: refactor to user CurrentUser as the user model
        this.model = new User({ id: CurrentUser.get('id') });
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
    },

    render: function () {
        this.$el.html(render('home_page/signed_in_user_info', this.model));
    }
});
