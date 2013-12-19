ApplicationEndorseButtonView = Backbone.View.extend({
    events: {
        'click .endorse_btn': 'toggleEndorsing'
    },

    initialize: function (options) {
        this.model = new EndorseButton();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);

        this.model.set({ 'establishment_id': options.establishment.get('id'), 'user_endorsing': options.establishment.get('user_endorsing') }, { silent: true });
        this.render();
    },

    render: function () {   
        this.$el.html(render('application/endorse_button', this.model));
    },

    toggleEndorsing: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
