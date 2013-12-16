PaginationView = Backbone.View.extend({
	events: {
		'click a.page': 'pageChange'
	},

	initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'all', function (e) {
        	console.log(e)
        });
	},

	render: function () {
		this.$el.html(render('application/pagination', this.collection));	
	},

	pageChange: function (e) {
		e.preventDefault();
		if (e.target.rel) this.collection.trigger('paginate', Number(e.target.rel));
	}
});
