PhotosGalleryMainImageView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();
  
        this.listenTo(this.collection, 'new_selection', function (new_model) {
            console.log(this.model.get('caption'))

            this.model.set(new_model.toJSON());
            this.render();
        });
    },

    render: function (model) {
        console.log('rendered Main Image');

        this.$el.html(render('photos/gallery_main_image', this.model)); 
    }
});
