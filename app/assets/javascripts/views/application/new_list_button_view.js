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
        console.log('new list create')
        e.preventDefault();
        var title = CurrentUser.logged_in() ? CurrentUser.get('full_name') + '\'s Favorite Spots' : 'My Favorite Spots'
        var desc = CurrentUser.logged_in() ? CurrentUser.get('full_name') + '\'s Favorite Spots List.' : 'My Favorite Spots List.'
        
        this.model = new List({
            title: title,
            description: desc
        });

        this.collection = new ListingsCollection();
        this.listenTo(this.model, 'sync', this.render);
        this.model.save({}, { success: goToListEdit });

        function goToListEdit(model) {
            App.navigate('/lists/' + model.get('id') + '/edit', { trigger: true });
        }
    }
});
