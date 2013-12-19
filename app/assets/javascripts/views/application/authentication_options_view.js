AuthenticationOptionsView = Backbone.View.extend({
    events: {
        'click .cancel': 'hideModal'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/authentication_options'));
    },

    hideModal: function () {
        $('#login_modal_container').fadeOut('60');
    }
});
