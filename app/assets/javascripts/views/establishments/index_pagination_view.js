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
		this.collection.requested_page = e.target.rel;

		var params = _.extend(Location.predicate(), Filter.predicate(), Client.predicate(), this.collection.predicate());

        this.collection.fetch({ reset: true, data: params });
		App.navigate(e.target.pathname + e.target.search, { trigger: false, replace: false });

		window.scrollTo(0,0);
	}
});
