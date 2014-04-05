ListsEditDescriptionView = Backbone.View.extend({
    events: {
        'blur .list_info_input': 'triggerUpdateListInfo'
    },

    initialize: function () {
        var desc = this.model.get('description');

        if (desc === null || desc.length === 0 ) {
            desc = this.model.get('user_first_name') + '\'s ' + this.model.get('title') + ' list.';
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