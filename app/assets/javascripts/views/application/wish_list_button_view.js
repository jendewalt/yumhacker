ApplicationWishListButtonView = Backbone.View.extend({
    events: {
        'click .wish_list_btn.not_wish_listed': 'addToWishList'
    },

    initialize: function (options) {
        this.model = new WishListButton();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);

        console.log(options)

        this.model.set({ 
            'establishment_id': options.establishment.get('id'), 
            'user_wish_listed': options.establishment.get('user_wish_listed'),
            'listing_id': options.establishment.get('listing_id') 
        }, { silent: true });
        this.render();
    },

    render: function () {   
        this.$el.html(render('application/wish_list_button', this.model));
    },

    addToWishList: function (e) {
        e.preventDefault();
        this.model.wishList();
    }
});
