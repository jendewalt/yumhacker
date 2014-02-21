ListsShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.model.fetch();
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show'));

        this.lists_show_title_view = new ListsShowTitleView({
            el: '#list_title_container',
            model: this.model
        });

        this.lists_show_description_view = new ListsShowDescriptionView({
            el: '#list_description_container',
            model: this.model
        });
    }
});