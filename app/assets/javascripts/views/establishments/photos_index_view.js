EstablishmentsPhotosIndexView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();

        this.collection = new PhotoCollection({
            establishment_id: this.model.get('id')
        });

        // this.photos_index_main_image_view = new PhotosIndexMainImageView({
        //     collection: this.collection,
        //     model: this.model,
        //     el: '#main_image_container'
        // });

        this.photos_index_list_view = new PhotosIndexListView({
            collection: this.collection,
            model: this.model,
            el: '#index_photos_container'
        });

        this.listenTo(this.model, 'sync', this.getPhotos)
        this.model.fetch({ reset: true });       
	},

	render: function () {

		this.$el.html(render('establishments/photos_index', this.model));	
	},

    getPhotos: function () {
        this.collection.fetch({ reset: true, data: { id: this.model.get('id'), type: 'establishment' } });
    }
});
