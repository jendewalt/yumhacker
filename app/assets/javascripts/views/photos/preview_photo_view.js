PhotosPreviewPhotoView = Backbone.View.extend({
    events:{
        'click .preview_photo': 'goToPhotoIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/preview_photo', this.model));
    },

    goToPhotoIndex: function () {
        App.navigate('establishments/' + this.model.get('establishment_id') + '/photos', { trigger: true });
    }
});