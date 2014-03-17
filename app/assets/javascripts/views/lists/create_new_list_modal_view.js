ListsCreateNewListModalView = Backbone.View.extend({
    events: {
        'submit #create_new_list_form': 'handleSubmit'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('lists/create_new_list_modal'));
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var title = e.target[0].value;
        var description = e.target[1].value;

        if (CurrentUser.logged_in()) {
            this.new_list = new List({
                title: title,
                listing: this.model
            });

            this.new_list.save();
            // TODO: Take user to List Edit page
            ModalView.hide();
        } else {
            CurrentUser.authenticate();            
        }

    }
});
