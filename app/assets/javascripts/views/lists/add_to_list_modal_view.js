ListsAddToListModalView = Backbone.View.extend({
    events: {
        'submit #add_listing_to_list_form': 'handleSubmit'
    },

    initialize: function () {
        this.render();

        console.log(this.model)

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
        console.log('Submit!');
        xxx = this.model
        var list_id = e.target[0].value;
        var listing_comment = e.target[1].value;

        $.trim(listing_comment);

        if (CurrentUser.logged_in()) {
            this.new_listing = new Listing({
                establishment_id: this.model.get('id'),
                list_id: list_id
            });

            this.new_listing.save();
        } else {
            CurrentUser.authenticate();            
        }
        






        // if (CurrentUser.logged_in()) {
        //     if (body && body.length <= 100) {
        //         this.new_comment = new Comment({
        //             body: body,
        //             establishment_id: this.model.get('id')
        //         });
                
        //         this.new_comment.save({}, {success: updateCollection});

        //         $('#comment_input').val('');
        //         $('#char_counter span').html(100)            
        //     } else {
        //         alert('Comments cannot be blank and have a character limit of 100 characters.');
        //     }
        // } else {
        // }
    }

});
