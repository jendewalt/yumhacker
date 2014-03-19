ListEditUserImageView = Backbone.View.extend({
    events: {
        'click img': 'saveAsListImage'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_list_user_image', this.model));
    },

    saveAsListImage: function (e) {
        console.log('clicked!')
    }
});