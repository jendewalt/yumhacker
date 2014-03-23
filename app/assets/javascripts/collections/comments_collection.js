CommentsCollection = Backbone.Collection.extend({
    model: Comment,

    url: '/api/comments',

    parse: function (res) {
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total_pages = res.total_pages;
        this.offset = res.offset;
        this.total = res.total;

        return res.comments;
    },

    comparator: function (model_1, model_2) {
        return model_1.get('updated_at') < model_2.get('updated_at');
    }
});
