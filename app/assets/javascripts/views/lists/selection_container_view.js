ListsSelectionContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new ListCollection();
        this.listenTo(this.collection, 'reset', this.render);
        // this.collection.fetch({ reset: true, data: CurrentUser.get('id') });

    },

    render: function () {
        console.log('Rendering list modal');
        this.$el.html(render('lists/add_to_list_modal', this.model));
    }

});
