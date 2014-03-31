ListsEditTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate',
        'click #delete_list': 'deleteList',
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

    updateListModelTitle: function () {
        console.log('Edit Title: Updating model title')
        console.log($('#title_input').val())

        this.model.set('title', $('#title_input').val());
    },

    saveList: function (listing) {
        console.log('Edit title: Saving List');
        console.log(listing)
        // this.model.save({}, { success: $.proxy(this.saveListing, this) });
    }
});