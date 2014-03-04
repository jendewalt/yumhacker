ApplicationFavoriteButtonView = Backbone.View.extend({
    events: {
        'click .favorite_btn': 'toggleFavoriting'
    },

    initialize: function (options) {
        console.log(options)
        this.model = new FavoriteButton();
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);

        this.model.set({ 'list_id': options.list.get('id'), 'user_favoriting': options.list.get('user_favoriting') }, { silent: true });
        this.render();
    },

    render: function () {   
        this.$el.html(render('application/favorite_button', this.model));
    },

    toggleFavoriting: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
