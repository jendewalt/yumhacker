ListsEditDescriptionView = Backbone.View.extend({
    events: {
        'blur .list_info_input': 'triggerUpdateListInfo'
    },

    initialize: function () {
        var desc = this.model.get('description');

        if (desc === null || desc.length === 0 ) {
            if (this.model.get('type') === 'CustomList') {
                desc = 'These are some bars and restaurants I totally dig.';
            } else {
                desc = this.model.get('user_first_name') + '\'s Wish List of places to scope out.';                
            }

            this.model.set('description', desc);
        }
        this.render();
        $('textarea').autosize();
    },

    render: function () {
        this.$el.html(render('lists/edit_description', this.model));
    },

    triggerUpdateListInfo: function () {
        this.model.trigger('update_list_info');
    }
});