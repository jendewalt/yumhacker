ListsAddToListModalView = Backbone.View.extend({
    events: {
        'submit #add_listing_to_list_form': 'handleSubmit',

    },

    initialize: function () {
        this.render();

        this.selection_container_view = new ListsAddToListSelectionContainerView({
            el: '#list_selection_container',
            establishment: this.model
        });
    },

    render: function () {
        console.log('Rendering list modal');
        this.$el.html('');
        this.$el.html(render('lists/add_to_list_modal', this.model));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var list_id = e.target[0].value;
        var comment_body = $.trim(e.target[1].value);

        if (CurrentUser.logged_in()) {
            this.new_listing = new Listing({
                establishment_id: this.model.get('id'),
                list_id: list_id,
                comment: comment_body
            });

            this.new_listing.save();
            ModalView.hide();
        } else {
            CurrentUser.authenticate();            
        }
    }
});
