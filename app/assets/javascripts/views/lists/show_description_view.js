ListsShowDescriptionView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        if (this.model.get('description') === null) {
            var desc = this.model.get('user_first_name') + '\'s ' + this.model.get('title') + ' list.';
            this.model.set('description', desc);
        }
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show_description', this.model));
    }
});