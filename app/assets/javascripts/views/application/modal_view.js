ApplicationModalView = Backbone.View.extend({
    events: {
        'click .cancel': 'hide'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('application/modal'));
    },

    show: function (view) {
        this.$('inner_modal_content').html(view.el)
        this.$el.show();
    },

    hide: function () {
        this.$el.fadeOut('60')
    },
});
