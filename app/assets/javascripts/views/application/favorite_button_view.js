ApplicationFavoriteButtonView = Backbone.View.extend({
    events: {
        'click .favorite_btn': 'toggleFavoriting'
    },

    initialize: function (options) {
        this.model = new FavoriteButton();
        xxx = this.model
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);

        this.model.set({ 
            'list_id': options.list.get('id'), 
            'user_favoriting': options.list.get('user_favoriting'), 
            'number_favorites': options.list.get('number_favorites') 
        }, { silent: true });
        this.render();
    },

    render: function () {  
        console.log(this.model) 
        this.$el.html(render('application/favorite_button', this.model));
    },

    toggleFavoriting: function (e) {
        e.preventDefault();
        this.model.toggle();
    }
});
