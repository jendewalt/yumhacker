ListsEditListingsSelectEndorsedModalView = Backbone.View.extend({
    events: {
    },

    initialize: function (opts) { 
        this.list = opts.list
        this.listings = opts.listings
        this.collection = new EndorsementCollection();
        this.listenTo(this.collection, 'reset', this.render);
        var data = _.extend( Location.predicate(), { user_id: CurrentUser.get('id') });

        this.collection.fetch({ reset: true, data: data });
    },

    render: function () {
        console.log(this.collection)
        this.$el.html(render('lists/edit_listings_select_endorsed_modal'));
    },

    // openListingSearchModal: function () {
    //     ModalView.show(new ListsEditAddListingsModalView({
    //         model: this.model,
    //         collection: this.collection,
    //         el: '#inner_modal_content'
    //     }));
    // }
});