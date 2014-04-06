ListsShowListingView = Backbone.View.extend({
    events: {
        'click .biz_name': 'navigate'
    },

    initialize: function () {
        this.render();

        this.categories_view = new EstablishmentsIndexEstablishmentCategoriesView({ 
            el: this.$('.categories_container'),
            collection: this.model.categories 
        });  

        this.application_wish_list_button_view = new ApplicationWishListButtonView({ 
            el: this.$('.wish_list_btn_container'),
            model: this.model
        }); 

        this.add_to_list_button_view = new ApplicationAddToListButtonView({ 
            el: this.$('.add_to_list_btn_container'),
            model: this.model
        }); 

        if (this.model.get('comment')) {
            this.comment_view = new ListsShowListingCommentView({
                el: this.$('.listing_comment_container'),
                model: new Comment(this.model.get('comment'))
            });
        }
    },

    render: function () {
        this.$el.html(render('lists/show_listing', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }   
});
