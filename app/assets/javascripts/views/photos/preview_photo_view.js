PhotoPreviewPhotoView = Backbone.View.extend({
    events:{
        'click .preview_photo': 'goToPhotoIndex'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/preview_photo', this.model));
    },

    goToEstablishmentShow: function () {
        // App.navigate('photos/' + this.model.get('id'), { trigger: true });
    }
});