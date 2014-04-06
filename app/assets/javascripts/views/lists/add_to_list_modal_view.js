ListsAddToListModalView = Backbone.View.extend({
    events: {
        'submit #add_listing_to_list_form': 'handleSubmit',
    },

    initialize: function () {
        this.render();
        this.collection = new ListsCollection();
        this.collection.where = { user_id: CurrentUser.get('id') };
        this.collection.order = [{ type: 'desc'}, { updated_at: 'desc' }];

        this.selection_container_view = new ListsAddToListSelectionContainerView({
            el: '#list_selection_container',
            establishment: this.model,
            collection: this.collection
        });

        $('textarea').autosize();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('lists/add_to_list_modal', this.model));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var list_id = e.target[0].value;
        var comment_body = $.trim(e.target[1].value);
        var establishment_id = this.model.get('establishment_id') ? this.model.get('establishment_id') : this.model.get('id');
        var selected_list_establishments = this.collection.get(list_id).get('establishment_ids');

        if (CurrentUser.logged_in()) {
            if (!_.contains(selected_list_establishments, establishment_id)) {
                this.new_listing = new Listing({
                    establishment_id: establishment_id,
                    list_id: list_id,
                    comment: comment_body
                });

                this.new_listing.save({}, { success: $.proxy(this.updateModel, this) });
            }
            ModalView.hide();                
        } else {
            CurrentUser.authenticate();            
        }
    },

    updateModel: function (model, res) {
        this.model.set('wish_listed', res.wish_listed);
        this.model.trigger('new_listing');
    }
});
