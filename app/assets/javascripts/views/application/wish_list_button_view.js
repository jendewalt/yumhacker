ApplicationWishListButtonView = Backbone.View.extend({
    events: {
        'click .wish_list_btn.unengaged': 'addToWishList'
    },

    initialize: function () {
        // TODO: make wishlist button compatible with api
        this.wish_list_btn = new WishListButton();

        this.listenTo(this.wish_list_btn, 'sync', this.render);
        this.listenTo(this.wish_list_btn, 'change', this.render);
        this.listenTo(this.model, 'new_listing', this.render);
        this.listenTo(this.model, 'change', this.render);

        this.render();
    },

    render: function () { 
        this.wish_list_btn.set({ 
            'establishment_id': this.model.get('establishment_id') ? this.model.get('establishment_id') : this.model.get('id'),
            'wish_list_id': this.model.get('wish_list_id'),
            'wish_listed': this.model.get('wish_listed')
        });
        this.$el.html(render('application/wish_list_button', this.wish_list_btn));
    },

    addToWishList: function (e) {
        e.preventDefault();
        if (CurrentUser.logged_in()) {
            this.wish_list_btn.wishList();
            this.model.set('wish_listed', true);            
        } else {
            CurrentUser.authenticate();
        }
    }
});
