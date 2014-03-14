FollowedEndorserView = Backbone.View.extend({
    events:{
        'click a.user': 'navigate'
    },

    initialize: function () {
        this.render();
        this.listenTo(this.model, 'remove', this.remove);
    },
    
    render: function () {
        this.$el.html(render('establishments/followed_endorser', this.model));
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});