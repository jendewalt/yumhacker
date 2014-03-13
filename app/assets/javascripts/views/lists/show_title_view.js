ListsShowTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
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
        xxx = e
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});