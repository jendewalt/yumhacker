EndorsementsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);

        var data = _.extend( MainSearch.predicate(), { user_id: this.model.get('id') });

        this.collection.fetch({ reset: true, data: data });
    },

    render: function () {
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(function (endorsement){
                this.renderEndorsement(endorsement);
            }, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('endorsements/index_no_results', this.model));
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
        var data = _.extend( MainSearch.predicate(), { user_id: this.model.get('id'), page: e });
        this.collection.fetch({ reset: true, data: data });
    }
});
