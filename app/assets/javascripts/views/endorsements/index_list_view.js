EndorsementsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new EndorsementCollection();

        this.listenTo(this.collection, 'reset', this.render);

        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html(render('endorsements/index_endorsement_list'));
        this.collection.each(function (endorsement){
            this.renderEndorsement(endorsement);
        }, this);
    },

    renderEndorsement: function (endorsement) {
        var endorsement_view = new EndorsementsIndexEndorsementView({
            tagName: 'li',
            model: endorsement
        });

        this.$('ul.endorsements').append(endorsement_view.el);
    }
});
