ApplicationFavoriteButtonView = Backbone.View.extend({
    events: {
        'click .favorite_btn': 'toggleFavoriting'
    },

    initialize: function (options) {
        this.listenTo(this.model, 'sync', this.render);
        this.listenTo(this.model, 'change', this.render);

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
