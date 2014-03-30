ApplicationAddToListButtonView = Backbone.View.extend({
    events: {
        'click .add_to_list_btn': 'showAddListingToListModal'
    },

    initialize: function () {
        this.render();
    },

    render: function () {  
        this.$el.html(render('application/add_to_list_button', this.model));
    },

    showAddListingToListModal: function () {
        if (CurrentUser.logged_in()) {
            ModalView.show(new ListsAddToListModalView({ 
                el: '#inner_modal_content',
                model: this.model
            }));   
        } else {
            CurrentUser.authenticate();
        }            
    }
});
