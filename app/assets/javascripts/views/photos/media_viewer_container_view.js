PhotosMediaViewerContainerView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('photos/media_viewer_container'));

        if (!this.collection.isEmpty()){
            this.photos_media_viewer_view = new PhotosMediaViewerView({
                collection: this.collection,
                el: this.$('.flexslider')
            });            
        } else {
            this.$el.html(render('photos/no_results', this.model));
        }
    }
});
