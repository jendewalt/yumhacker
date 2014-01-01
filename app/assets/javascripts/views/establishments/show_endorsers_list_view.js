EstablishmentsShowEndorsersListView = Backbone.View.extend({
	
	initialize: function () {
		this.collection = new EndorsersCollection();

        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'request', this.showThrobber);

        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get('id') }});
    },

    render: function () {
        this.$el.html('');

        this.collection.each(function (user) {
            this.renderUser(user);
        }, this);
    },

    renderUser: function (user) {
        var user_view = new UsersIndexUserView({
            tagName: 'li',
            model: user
        });

        if (user.id == CurrentUser.id) {
            this.$el.prepend(user_view.el);
        } else {
            this.$el.append(user_view.el);
        }
    }, 

    showThrobber: function () {
        this.$el.html(render('application/throbber_small'));
    }
});
