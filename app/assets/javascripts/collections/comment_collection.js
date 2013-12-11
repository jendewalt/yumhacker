CommentCollection = Backbone.Collection.extend({
    model: Comment,

    url: '/api/comments',

    parse: function (response) {
        return response.comments;
    },
});
