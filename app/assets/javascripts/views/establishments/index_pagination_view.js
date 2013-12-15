EstablishmentsIndexPaginationView = Backbone.View.extend({
	events: {
		'click a.page': 'goToPage'
	},

	initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html(render('establishments/pagination', this.collection));	
	},

	goToPage: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname + e.target.search, { trigger: true });
	}
});
