ListsEditListingPhotoEstablishmentImagesListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.collection = new PhotosCollection({});
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get("establishment_id")} });
    },

    render: function () {
        if (this.collection.length > 0 ) {
            this.collection.each(function (image) {
                this.renderEstablishmentImage(image);
            }, this);
        } else {
            this.$el.append("<p>This restaurant doesn't have any photos, yet.</p>");            
        }
            
    },

    renderEstablishmentImage: function (image) {
        var image_view = new ListEditListingPhotoEstablishmentImageView({
            tagName: 'li',
            model: image,
            listing: this.model
        });

        this.$el.append(image_view.el);
    }
});
