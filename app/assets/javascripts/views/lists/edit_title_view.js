ListsEditTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();

        this.lists_edit_photo_view = new ListsEditPhotoView({
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
    }
});