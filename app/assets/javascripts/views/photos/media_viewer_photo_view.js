PhotosMediaViewerPhotoView = Backbone.View.extend({
    events: {
        'click .user_name': 'goToUserShow'
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

    goToUserShow: function () {
        App.navigate('users/' + this.model.get('user_id'), { trigger: true });
    }
});