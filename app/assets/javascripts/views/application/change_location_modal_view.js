ChangeLocationModalView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.render();

        this.main_search_view = new MainSearchView({
            el: '#main_search_view_container'
        });
    },

    render: function () {
        this.$el.html(render('application/change_current_location_modal'));
    }

});
