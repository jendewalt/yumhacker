HomePageCreateListView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.render();

        this.new_list_view = new NewListButtonView({
            el: '#home_page_new_list_btn_container'
        });
    },

    render: function () {
        this.$el.html(render('home_page/create_list'));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }

});