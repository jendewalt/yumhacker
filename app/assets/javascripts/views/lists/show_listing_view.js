ListsShowListingView = Backbone.View.extend({
    events: {
        'click .biz_name': 'goToEstablishmentShow'
    },

    initialize: function () {
        this.render();

        // Don't know why this needs to cycle. Look into it later.
        var that = this;
        setTimeout(function () {
            that.showComment();
        }, 0);
    },

    showComment: function () {
        if (this.model.comment) {
            this.comments_view = new CommentsListingCommentView({
                el: '.listing_comment_container',
                model: this.model.comment
            });           
        }
    },

    render: function () {
        this.$el.html(render('lists/show_listing', this.model)); 
    },

    goToEstablishmentShow: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
