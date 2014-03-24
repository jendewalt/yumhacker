ListsShowTitleView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();
        console.log(this.model)

        this.application_favorite_button_view = new ApplicationFavoriteButtonView({ 
            el: this.$('#list_favorite_button'),
            list: this.model 
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