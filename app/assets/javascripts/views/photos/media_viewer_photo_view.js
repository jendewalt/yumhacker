PhotosMediaViewerPhotoView = Backbone.View.extend({
    events: {
        'click .user_name': 'navigate',
        'click .delete_photo': 'deletePhoto',
    },

    initialize: function () {
        var raw_time = new Date(this.model.get('created_at'));
        var formatted_time = moment(raw_time).format('MMM Do YYYY, h:mm a');
        this.model.set('formatted_time', formatted_time);

        this.render();
    },

    render: function (model) {
        this.$el.html(render('photos/media_viewer_photo', this.model)); 
        this.$el.attr('data-thumb', this.model.get('small_url'))
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    },

    deletePhoto: function () {
        if (CurrentUser.get('id') == this.model.get('user_id')) {
            this.model.destroy();
        }
    }
});