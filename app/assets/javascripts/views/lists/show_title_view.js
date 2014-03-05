ListsShowTitleView = Backbone.View.extend({
    events: {
        'a': 'goToSubIndex'
    },

    initialize: function () {
        this.render();

        this.application_favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('#list_favorite_button'),
            list: this.model 
        });
    },

    render: function () {
        this.$el.html(render('lists/show_title', this.model));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});