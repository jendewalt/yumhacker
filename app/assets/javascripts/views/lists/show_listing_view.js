ListsShowListingView = Backbone.View.extend({
    events: {
        'click .add_to_list_btn': 'showModal'
    },

    initialize: function () {
        this.render();

        this.categories_view = new EstablishmentsIndexEstablishmentCategoriesView({ 
            el: this.$('.categories_container'),
            collection: this.model.categories 
        }); 

        this.application_endorse_button_view = new ApplicationEndorseButtonView({ 
            el: this.$('.endorse_btn_container'),
            establishment: this.model 
        }); 

        if (this.model.get('comment')) {
            this.comment_view = new CommentsListingCommentView({
                el: this.$('.listing_comment_container'),
                model: new Comment(this.model.get('comment'))
            });
        }
    },

    render: function () {
        this.$el.html(render('lists/show_listing', this.model));
    },

    showModal: function () {
        if (CurrentUser.logged_in()) {
            // ModalView.show(new ListsAddToListModalView({
            //     el: '#inner_modal_content',
            //     model: this.model
            // }));
            CurrentUser.addListingToListModal(this.model);
        } else {
            CurrentUser.authenticate();
        }            
    }
});
