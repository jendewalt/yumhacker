HeaderCurrentLocationView = Backbone.View.extend({
    events: {
        'click a#change_location': 'showChangeLocationModal',
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.listenTo(Client, 'change:formatted_address', this.render);

        this.render();
    },

    render: function () {
        this.$el.html(render('application/header_current_location'));
    },

    showChangeLocationModal: function (e) {
        e.preventDefault();
        ModalView.show(new ChangeLocationModalView({
            el: '#inner_modal_content'
        }));
    },

    navigate: function (e) {
        e.preventDefault();
        e.stopPropagation();
        App.navigate(e.target.pathname, { trigger: true });
    }

});
