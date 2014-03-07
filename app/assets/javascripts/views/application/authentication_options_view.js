AuthenticationOptionsView = Backbone.View.extend({
    events: {
        'click': 'consoleTest'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/authentication_options'));
    },

    consoleTest: function () { console.log('click') }
});
