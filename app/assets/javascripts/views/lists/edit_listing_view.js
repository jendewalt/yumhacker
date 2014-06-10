ListsEditListingView = Backbone.View.extend({
    events: {
        'click .biz_name': 'navigate',
        'click .delete_listing': 'deleteListing'
    },

    initialize: function () {
        this.render();

        this.categories_view = new EstablishmentsIndexEstablishmentCategoriesView({ 
            el: this.$('.categories_container'),
            collection: this.model.categories 
        });  

        this.comment_view = new ListsEditListingCommentView({
            el: this.$('.listing_comment_container'),
            model: this.model
        });

        this.photo_view = new ListsEditListingPhotoContainerView({
            el: this.$('.listing_photo_container'),
            model: this.model
        });
    },

    render: function () {
        this.$el.html(render('lists/edit_listing', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    },

    deleteListing: function () {
        this.model.destroy();
    }
});
