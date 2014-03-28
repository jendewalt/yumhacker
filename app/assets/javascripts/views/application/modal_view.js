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
        this.view = view;
        this.$('inner_modal_content').html(view.el);
        this.$el.show();
    },

    hide: function () {
        var that = this;
        this.$el.fadeOut('20', function () {
            that.view.remove(); 
            that.$('.inner_modal').append($('<div>', { id: 'inner_modal_content' }));
        });
    }
});
