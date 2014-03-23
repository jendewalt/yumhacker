PreviewPhotosCollection = Backbone.Collection.extend({
    model: Photo,

    url: '/api/photos/preview_photos',

    parse: function (response) {
        return response.photos;
    },
});
