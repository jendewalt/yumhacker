PaginationView = Backbone.View.extend({
	events: {
		'click a.page': 'pageChange'
	},

	initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		this.$el.html(render('application/pagination', this.collection));	
	},

	pageChange: function (e) {
		// TODO: maybe this should operate on the collection instead of triggering and event
		e.preventDefault();
		if (e.target.rel) this.collection.trigger('paginate', Number(e.target.rel));
	}
});
