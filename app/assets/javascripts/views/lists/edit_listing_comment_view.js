ListsEditListingCommentView = Backbone.View.extend({
    events:{
        'blur .comment_input': 'saveComment'
    },

    initialize: function (opts) {
        this.listing = opts.listing;
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_listing_comment', this.model));
    },

    saveComment: function (e) {
        var body = $.trim(e.target.value);

        if (body !== this.model.get('body')) {
            this.model.set({ 
                listing_id: this.listing.get('id'),
                body: e.target.value,
                updated_at: new Date
            });

            this.model.format_time();
            this.model.save();           
        }
    }
});
