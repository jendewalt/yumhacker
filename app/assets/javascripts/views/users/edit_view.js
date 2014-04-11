UsersEditView = Backbone.View.extend({
    events: {
        'click a.expander': 'openChangePasswordFields',
        'submit': 'showThrobber'
    },

    initialize: function () {
        console.log('hello')
        $('textarea').autosize();
    },

    openChangePasswordFields: function (e) {
        console.log('hola')
        e.preventDefault();
        e.stopPropagation();
        $('#password_fields').show();
    },

    showThrobber: function () {
        $('.update_btn').hide();
        $('.throbber').show();        
    }
});
