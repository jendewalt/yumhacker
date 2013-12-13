PhotosGalleryThumbView = Backbone.View.extend({
    events:{
        'click': 'selectPhoto'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(render('photos/gallery_thumb', this.model));
    },

    selectPhoto: function () {
        console.log('Thumb selected: ' + this.model.get('medium_url'));
        console.log(this.model);
        this.collection.trigger('new_selection', this.model);
    }
});