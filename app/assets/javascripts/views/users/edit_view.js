UsersEditView = Backbone.View.extend({
    events: {
        'click a.expander': 'openChangePasswordFields',
        'submit': 'showThrobber'
    },

    initialize: function () {
    },

    openChangePasswordFields: function () {
        $('#password_fields').show();
    },

    showThrobber: function () {
        $('.update_btn').hide();
        $('.throbber').show();        
    }
});
