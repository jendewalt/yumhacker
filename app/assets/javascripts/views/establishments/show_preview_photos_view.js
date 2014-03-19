EstablishmentShowPreviewPhotosView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'add', this.render);
        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html('');  

        this.collection.each(function (photo) {
            this.renderPhoto(photo);
        }, this);   
    },

    renderPhoto: function (photo) {
        var photo_view = new PhotosPreviewPhotoView({
            tagName: 'div',
            model: photo,
            className: 'preview'
        });

        this.$el.append(photo_view.el);
    }
});