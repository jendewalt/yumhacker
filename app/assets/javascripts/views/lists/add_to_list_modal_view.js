ListsAddToListModalView = Backbone.View.extend({
    events: {

    },

    initialize: function () {
        this.render();

        this.selection_container_view = new ListsSelectionContainerView({
            el: '#list_selection_container',
            establishment: this.model
        });
    },

    render: function () {
        console.log('Rendering list modal');
        this.$el.html(render('lists/add_to_list_modal', this.model));
    }

});
