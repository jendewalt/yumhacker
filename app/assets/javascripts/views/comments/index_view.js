CommentsIndexView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.collection = new CommentCollection();

		this.comments_index_comments_form_view = new CommentsIndexCommentFormView({
            el: '#comments_form_container',
            model: this.model,
            collection: this.collection
        });

        this.comments_index_comments_list_view = new CommentsIndexCommentListView({
            el: '#comments_list',
            model: this.model,
            collection: this.collection
        });


        this.pagination_view = new PaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
	},

	render: function () {
		this.$el.html('');		
	}
});
