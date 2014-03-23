EstablishmentShowCommentsContainerView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.collection = new CommentsCollection();

		this.show_comments_form_view = new EstablishmentShowCommentFormView({
            el: '#comments_form_container',
            model: this.model,
            collection: this.collection
        });

        this.show_comments_list_view = new EstablishmentShowCommentListView({
            el: '#comments_list',
            model: this.model,
            collection: this.collection
        });

        this.pagination_view = new PaginationView({
            el: '.pagination_container.comments',
            collection: this.collection
        });
	},

	render: function () {
	}
});
