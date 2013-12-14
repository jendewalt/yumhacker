EstablishmentsPhotosIndexView = Backbone.View.extend({
	events:{
        'click #biz_name': 'goToEstablishmentShow'
	},

	initialize: function () {
        this.collection = new PhotoCollection({
            establishment_id: this.model.get('id')
        });

        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch({ reset: true });       
    },

    render: function () {
        this.$el.html(render('establishments/photos_index', this.model)); 

        this.photos_gallery_view = new PhotosGalleryView({
            collection: this.collection,
            model: this.model,
            el: '#photos_gallery_container'
        });
        
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
