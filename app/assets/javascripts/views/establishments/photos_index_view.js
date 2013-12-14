EstablishmentsPhotosIndexView = Backbone.View.extend({
	events:{
        'click #biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
        this.collection = new PhotoCollection({
            establishment_id: this.model.get('id')
        });

        // This model is the Establishment Model
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({ reset: true });       
    },

    render: function () {
        console.log('photos_index estab model sync')
        console.log('photos_index render')
        this.$el.html(render('establishments/photos_index', this.model)); 

        this.photos_gallery_view = new PhotosGalleryView({
            collection: this.collection,
            model: this.model,
            el: '#photos_gallery_container'
        });
          
        this.photos_upload_forms_view = new PhotosUploadFormsView({
            model: this.model,
            collection: this.collection,
            el: '#photos_upload_forms_container'
        });   

        // Get photo collection for Establishment
        this.collection.fetch({ 
            reset: true, 
            data: { 
                id: this.model.get('id'), 
                type: 'establishment' 
            } 
        });
    },

    goToEstablishmentShow: function () {
        App.navigate('establishments/' + this.model.get('id'), { trigger: true });
    }
});
