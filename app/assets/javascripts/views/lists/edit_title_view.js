ListsEditTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate',
        'click #delete_list': 'deleteList'
    },

    initialize: function () {
        this.render();

        this.lists_edit_list_photo_view = new ListsEditListPhotoContainerView({
            el: '#list_photo_container',
            model: this.model
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_title', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    },

    deleteList: function () {
        if (CurrentUser.logged_in()) {
            var delete_list = confirm('Are you sure you want to permenantly delete your list?');

            if (delete_list) {
                this.model.destroy();
                App.navigate('/', { trigger: true });
            }
        } else {
            CurrentUser.authenticate();
        }
            
    }
});