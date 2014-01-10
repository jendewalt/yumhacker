UsersEditView = Backbone.View.extend({
    events: {
        'click a.expander': 'openChangePasswordFields',
        'submit': 'showThrobber'
    },

    initialize: function () {
        console.log('init')
    },

    openChangePasswordFields: function () {
        console.log('open!')
        $('#password_fields').show();
    },

    showThrobber: function () {
        $('.update_btn').hide();
        $('.throbber').show();        
    }
});
