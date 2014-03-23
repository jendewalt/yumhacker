ListsEditDescriptionView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        var desc = this.model.get('description');

        if (desc === null || desc.length === 0 ) {
            desc = this.model.get('user_first_name') + '\'s ' + this.model.get('title') + ' list.';
            this.model.set('description', desc);
        }
        this.render();
    },

    render: function () {
        this.$el.html(render('lists/edit_description', this.model));
    }
});