FollowedEndorserView = Backbone.View.extend({
    events:{
        'click a.user': 'goToUserShow'
    },

    initialize: function () {
        this.render();
        this.listenTo(this.model, 'remove', this.remove);
    },
    
    render: function () {
        console.log('rendered my user')
        this.$el.html(render('establishments/followed_endorser', this.model));
    },

    goToUserShow: function (e) {
        e.preventDefault();
        App.navigate(e.currentTarget.pathname, { trigger: true });
    }
});