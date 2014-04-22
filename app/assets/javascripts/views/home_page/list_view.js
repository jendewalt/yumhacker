HomePageListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('.favorite_btn_container'),
            model: new FavoriteButton({
                'list_id': this.model.get('id'), 
                'user_favoriting': this.model.get('user_favoriting'), 
                'number_favorites': this.model.get('number_favorites') 
            })
        });     
    },

    render: function () {
        this.$el.html(render('home_page/list', this.model));
    } 
});
