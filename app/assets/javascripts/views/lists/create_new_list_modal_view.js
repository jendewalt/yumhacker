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
        $('textarea').autosize();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var title = e.target[0].value;
        var description = e.target[1].value;

        if (CurrentUser.logged_in()) {
            this.new_list = new List({
                title: title,
                description: description,
                listing: this.model
            });

            this.new_list.save({}, { success: redirectToList });

            function redirectToList (model, res) {
                ModalView.hide();
                App.navigate(model.get('edit_path'), { trigger: true });
            }
        } else {
            CurrentUser.authenticate();            
        }

    }
});
