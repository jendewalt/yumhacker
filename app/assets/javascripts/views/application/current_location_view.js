CurrentLocationView = Backbone.View.extend({
    events: {
        'click a#change_location': 'showChangeLocationModal'
    },

    initialize: function () {
        console.log('Current Location View Init');
        this.listenTo(Client, 'change:formatted_address', this.render);

        this.render();
    },

    render: function () {
        this.$el.html(render('application/current_location'));
    },

    showChangeLocationModal: function (e) {
        e.preventDefault();
        ModalView.show(new ChangeLocationModalView({
            el: '#inner_modal_content'
        }));
    }

});
