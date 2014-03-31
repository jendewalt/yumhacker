NewListButtonView = Backbone.View.extend({
    events: {
        'click .new_list_btn': 'createNewList'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('application/new_list_button'));
    },

    createNewList: function (e) {
        e.preventDefault();
        
        if (CurrentUser.logged_in()) {
            // this.model = new List({
            //     title: CurrentUser.get('full_name') + '\'s Favorite Spots',
            //     description: CurrentUser.get('full_name') + '\'s Favorite Spots List.'
            // });

            // goToListEdit(this.model);
            // this.model.save({}, { success: goToListEdit });

            App.navigate('/lists/new', { trigger: true });

            // function goToListEdit(model) {
            //     App.navigate('/lists/' + model.get('id') + '/edit', { trigger: true });
            // }            
        } else {
            CurrentUser.authenticate();
        }
    }
});
