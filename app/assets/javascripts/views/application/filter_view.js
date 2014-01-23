FilterView = Backbone.View.extend({
    events: {
        'click input:radio': 'toggleFollowingFilter',
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/filter'));
    },

    toggleFollowingFilter: function (e) {
        Filter.set('following_filter', $(e.target).val());
    }

});