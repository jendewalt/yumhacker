ListsShowTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();

        this.application_favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('#list_favorite_button'),
            model: new FavoriteButton({
                'list_id': this.model.get('id'), 
                'user_favoriting': this.model.get('user_favoriting'), 
                'number_favorites': this.model.get('number_favorites') 
            })
        });
    },

    render: function () {
        this.$el.html(render('lists/show_title', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});