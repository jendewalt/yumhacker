ApplicationHeaderView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.render();

        this.main_search_view = new MainSearchView({
            el: '#establishment_search_container'
        });
    },

    render: function () {
        this.$el.html('')
        this.$el.html(render('application/header', CurrentUser));
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        var path = e.target.pathname

        if (path) {
            App.navigate(e.target.pathname, { trigger: true });
        } else if (CurrentUser.get('id')) {
            App.navigate('users/' + CurrentUser.get('id'), { trigger: true });            
        }
    }
});
