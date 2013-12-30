EndorsementsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);
        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id') }});
    },

    render: function () {
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(function (endorsement){
                this.renderEndorsement(endorsement);
            }, this);
        }
    },

    renderEndorsement: function (endorsement) {
        var endorsement_view = new EndorsementsIndexEstablishmentView({
            tagName: 'li',
            model: endorsement
        });
        this.$el.append(endorsement_view.el);
    },

    paginate: function (e) {
        this.collection.fetch({ reset: true, data: { user_id: this.model.get('id'), page: e } });
    }
});
