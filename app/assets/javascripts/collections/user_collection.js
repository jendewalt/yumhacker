UserCollection = Backbone.Collection.extend({
	model: User,

	url: '/api/users',

	parse: function (response) {
		return response.users;
	}
});
