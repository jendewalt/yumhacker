CommentsIndexCommentListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
        // this.collection = new CommentCollection();

        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'add', this.addNewComment);
        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get('id') } });
	},

	render: function () {
		console.log('Comments render!')

		this.$el.html('');	

    	this.collection.each(function (comment) {
			this.renderComment(comment);
		}, this);	
	},

	renderComment: function (comment) {
		var comment_view = new CommentsIndexCommentView({
			tagName: 'li',
			model: comment
		});

		this.$el.append(comment_view.el);
	},

	addNewComment: function (comment) {
		var comment_view = new CommentsIndexCommentView({
			tagName: 'li',
			model: comment
		});

		this.$el.prepend(comment_view.el);
	}
});
