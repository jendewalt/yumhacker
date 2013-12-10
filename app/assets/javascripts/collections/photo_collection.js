PreviewPhotoCollection = Backbone.Collection.extend({
    model: Photo,

    url: '/api/establishments/preview_photos',

    parse: function (response) {
        return response.photos;
    },
});
