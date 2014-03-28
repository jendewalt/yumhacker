ListsAddToListSelectionContainerView = Backbone.View.extend({
    events: {
        'change select': 'checkForNewList'
    },

    initialize: function (options) {
        this.establishment = options.establishment
        this.collection = new ListsCollection();

        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ 
            reset: true, 
            data: { 
                user_id: CurrentUser.get('id'),
                establishment_id: this.establishment.get('id')
            } 
        });
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
        if (e.target.value === 'new') {
            ModalView.show(new ListsCreateNewListModalView({
                el: '#inner_modal_content',
                model: this.establishment
            }));
        }
    }

});
