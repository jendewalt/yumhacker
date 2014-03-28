ListsShowListingView = Backbone.View.extend({
    events: {
        'click .add_to_list_btn': 'showAddListingToListModal',
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
            establishment_id: this.model.get('establishment_id'),
            wish_list_id: this.model.get('wish_list_id'),
            wish_listed: this.model.get('wish_listed')
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

    showAddListingToListModal: function () {
        if (CurrentUser.logged_in()) {
            ModalView.show(new ListsAddToListModalView({ 
                el: '#inner_modal_content',
                model: this.model
            }));   
        } else {
            CurrentUser.authenticate();
        }            
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }   
});
