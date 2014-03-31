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
            App.navigate('/lists/new', { trigger: true });            
        } else {
            CurrentUser.authenticate();
        }
    }
});
