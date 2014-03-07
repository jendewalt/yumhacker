CurrentUser = new (Backbone.Model.extend({
    urlRoot: '/api/users',

    initialize: function () {
        if ($.cookie('current_user')) {
            this.set(JSON.parse($.cookie('current_user')));
        }
    },

    logged_in: function () {
        return $.cookie('current_user') ? true : false;
    },

    authenticate: function () {
        ModalView.show(new AuthenticationOptionsView({ el: '#inner_modal_content' }));
    },

    addListingToListModal: function (listing) {
        ModalView.show(new ListsAddToListModalView({ 
            el: '#inner_modal_content',
            model: listing
        }));        
    }
}))();
