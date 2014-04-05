ListsEditTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate',
        'click #delete_list': 'deleteList',
        'click #save_btn': 'triggerSubmit',
        'blur .list_info_input': 'triggerUpdateListInfo'
    },

    // this.model = LIST

    initialize: function () {
        this.render();

        this.listenTo(this.model, 'save_listing', this.saveList);

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
    },

    triggerUpdateListInfo: function () {
        this.model.trigger('update_list_info');
    },

    triggerSubmit: function (e) {
        e.preventDefault();
        this.model.trigger('submit_list');
    }
});