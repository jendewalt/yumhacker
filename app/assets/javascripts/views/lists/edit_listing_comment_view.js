ListsEditListingCommentView = Backbone.View.extend({
    events:{
        'submit .comment_form': 'saveComment'
    },

    initialize: function (opts) {
        this.listing = opts.listing;
        this.listenTo(this.model, 'change', this.render);
        this.render();
        // TODO: Fails on the last textarea. Investigate (http://www.jacklmoore.com/autosize/)
        $('.comment_input').autosize();
        $('.comment_input').last().autosize(); // Does not work
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_comment', this.model));
    },

    saveComment: function (e) {
        e.preventDefault();
        var body = $.trim(e.target[0].value);

        if (body !== this.model.get('body')) {
            this.model.set({ 
                listing_id: this.listing.get('id'),
                body: body,
                updated_at: new Date
            });

            this.model.format_time();
            this.model.save();           
        }
    }
});
