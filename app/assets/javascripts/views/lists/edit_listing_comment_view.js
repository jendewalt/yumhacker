ListsEditListingCommentView = Backbone.View.extend({
    events:{
        'submit .comment_form': 'saveComment'
    },

    initialize: function () {
        this.comment = new Comment(this.model.get('comment'));
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_comment', this.comment));
    },

    saveComment: function (e) {
        e.preventDefault();
        this.$('textarea').addClass('flash');
        setTimeout(function () {
            this.$('textarea').removeClass('flash');
        }, 200);

        var body = $.trim(e.target[0].value);

        if (body !== this.comment.get('body')) {
            this.comment.set({ 
                listing_id: this.model.get('id'),
                body: body
            });

            // If the comment exists and the user entered in a blank, send blank for deletion
            if (body.length > 0 || (body.length === 0 && this.comment.get('id'))) {
                this.comment.save();
            } 
        }
    }
});
