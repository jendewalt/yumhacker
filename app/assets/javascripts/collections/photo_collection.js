PhotoCollection = Backbone.Collection.extend({
	model: Photo,

	url: '/api/photos',

	parse: function (response) {
		return response.photos;
	}
});
