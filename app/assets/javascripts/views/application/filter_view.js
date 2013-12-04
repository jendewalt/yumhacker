FilterView = Backbone.View.extend({
    events: {
        'click #from_followed': 'toggleFromFollowed',
        'change #radius_select': 'changeRadius'
    },

    initialize: function () {
        console.log(Filter.get('from_followed'));
        this.render();
    },

    render: function () {
        this.$el.html('');
        this.$el.html(render('application/filter'));
    },

    toggleFromFollowed: function (e) {
        Filter.set('from_followed', $(e.target).prop('checked'));
    },

    changeRadius: function (e) {
        console.log(e)
        console.log('Hello!')
        Filter.set('radius', e.target.value);
    }

});