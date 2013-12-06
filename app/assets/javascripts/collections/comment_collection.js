CommentCollection = Backbone.Collection.extend({
    model: Comment,

    url: '/api/establishments/comments',

    parse: function (response) {
        return response.comments;
    },
});
