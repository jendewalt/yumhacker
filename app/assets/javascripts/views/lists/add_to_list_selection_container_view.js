ListsAddToListSelectionContainerView = Backbone.View.extend({
    events: {
        'change': 'checkForNewList'
    },

    initialize: function (options) {
        this.establishment = options.establishment
        this.collection.per_page = 1000;
        this.collection.user_id = CurrentUser.get('id');
        this.establishment_id = this.establishment.get('id');

        var params = this.collection.predicate();

        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ 
            reset: true, 
            data: params
        });
    },

    render: function () {
        this.collection.each(function (list) {
            this.renderListOption(list)
        }, this);
        this.$el.append("<option class='list_option' value='new'>Create new list</option>");
    },

    renderListOption: function (list) {
        this.$el.append(render('lists/add_to_list_selection_option', list));
    },

    checkForNewList: function (e) {
        if (e.target.value === 'new') {
            ModalView.show(new ListsCreateNewListModalView({
                el: '#inner_modal_content',
                model: this.establishment
            }));
        }
    }

});
