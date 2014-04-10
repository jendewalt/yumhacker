CurrentUser = new (Backbone.Model.extend({
    urlRoot: '/api/users',

    initialize: function () {
        console.log('CurrentUser Init')
        if ($.cookie('current_user')) {
            this.set(JSON.parse($.cookie('current_user')));
        }
    },

    logged_in: function () {
        return $.cookie('current_user') ? true : false;
    },

    authenticate: function () {
        console.log('CurrentUser Authenticate')
        ModalView.show(new AuthenticationOptionsView({ el: '#inner_modal_content' }));
    }
}))();
