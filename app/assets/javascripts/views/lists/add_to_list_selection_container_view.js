ListsAddToListSelectionContainerView = Backbone.View.extend({
    events: {
        'change select': 'checkForNewList'
    },

    initialize: function (options) {
        this.establishment = options.establishment
        this.collection = new ListsCollection();
        this.collection.assignUrl(CurrentUser.get('id'));

        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true });
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('lists/add_to_list_selection_dropdown'));

        this.collection.each(function (list) {
            this.renderListOption(list)
        }, this);

        this.$('#list_selector').append("<option class='list_option' value='new'>Create new list</option>")
    },

    renderListOption: function (list) {
        this.$('#list_selector').append(render('lists/add_to_list_selection_option', list));
    },

    checkForNewList: function (e) {
        xxx = e.target.value

        if (e.target.value === 'new') {
            ModalView.createNewListModal(this.establishment);
        }
    }

});
