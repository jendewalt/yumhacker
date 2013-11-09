EndorsementsIndexEndorsementView = Backbone.View.extend({
    events:{
        'click .establishment_name': 'goToEstablishmentShow'
    },

    initialize: function () {
        this.render();
        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment_id: this.model.get('id') 
        });
    },

    render: function () {
        this.$el.html(render('endorsements/index_endorsement', this.model));
    },

    goToEstablishmentShow: function () {
        App.navigate('establishments/' + this.model.get('id'), { trigger: true });
    }
});
