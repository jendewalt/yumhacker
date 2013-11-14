ApplicationEndorseButtonView = Backbone.View.extend({
    events: {
        'click .endorse_btn': 'toggleEndorsing'
    },

    initialize: function (options) {
        this.model = new EndorseButton();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);
        this.model.set('establishment_id', options.establishment_id);
        this.model.fetch({ data: { establishment_id: this.model.get('establishment_id') }});   
    },

    render: function (e) {   
        this.$el.html(render('application/endorse_button', this.model));
    },

    toggleEndorsing: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
