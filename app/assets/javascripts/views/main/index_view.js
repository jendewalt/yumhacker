MainIndexView = Backbone.View.extend({

	initialize: function () {
		this.render();

		this.collection = new EstablishmentCollection();

        this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });

		this.listenTo(MainSearch, 'change', function () {
        	this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });
		});

		this.listenTo(Filter, 'change', function () {
        	this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });
		});

		MapView.el = '.map_canvas_container';
		MapView.collection = this.collection;
		MapView.render();
		this.listenTo(this.collection, 'reset', function () { MapView.resetMap(); });
		
		this.filter_view = new FilterView({
			el: '#main_filter_container',
		});

		this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
			el: '.establishments_list',
			collection: this.collection
		});

		this.pagination_view = new EstablishmentsIndexPaginationView({
			el: '#pagination_container',
			collection: this.collection
		});
    },

	render: function () {
		this.$el.html(render('main/index'));
	}
});
