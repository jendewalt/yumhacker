ListsEditListingCommentView = Backbone.View.extend({
    events:{
        'submit .comment_form': 'saveComment'
    },

    initialize: function () {
        this.comment = new Comment(this.model.get('comment'));
        this.listenTo(this.comment, 'change', this.render);
        this.render();
        // TODO: Fails on the last textarea. Investigate (http://www.jacklmoore.com/autosize/)
        $('.comment_input').autosize();
        $('.comment_input').last().autosize(); // Does not work
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_comment', this.comment));
    },

    saveComment: function (e) {
        e.preventDefault();
        var body = $.trim(e.target[0].value);

        if (body !== this.comment.get('body')) {
            this.comment.set({ 
                listing_id: this.model.get('id'),
                body: body
            });

            this.comment.save();
        }
    }
});
