ListsAddToListSelectionContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function (options) {
        this.establishment = options.establishment
        this.collection = new ListsCollection();
        this.collection.assignUrl(CurrentUser.get('id'));

        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true });
    },

    render: function () {
        console.log('in the selection render');
        console.log(this.establishment.get('id'));
        xxx = this.collection

        this.$el.html('');
        this.$el.html(render('lists/add_to_list_selection_dropdown'));

        this.collection.each(function (list) {
            this.renderListOption(list)
        }, this);
    },

    renderListOption: function (list) {
        this.$('#list_selector').append(render('lists/add_to_list_selection_option', list));
    }

});
