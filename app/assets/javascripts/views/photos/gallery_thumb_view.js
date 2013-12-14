PhotosGalleryThumbView = Backbone.View.extend({
    events:{
        'click img': 'selectPhoto',
        'click .username': 'goToUserShow'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        if (!this.model.get('caption')) {
            this.model.set('caption', '');
        }

        this.$el.html(render('photos/gallery_thumb', this.model));
    },

    selectPhoto: function () {
        this.collection.trigger('new_selection', this.model);
    },

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('user_id'), { trigger: true });
    }
});
