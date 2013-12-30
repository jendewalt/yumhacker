MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex'
	},

	initialize: function () {
		this.render();
		
		this.collection = new EstablishmentCollection();

        this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });

		this.listenTo(MainSearch, 'change', function () {
        	App.navigate(window.location.pathname + '?' + $.param(_.extend(MainSearch.predicate(), Filter.predicate() )), { trigger: true, replace: true });
		});

		this.listenTo(Filter, 'change', function () {
			App.navigate(window.location.pathname + '?' + $.param(_.extend(MainSearch.predicate(), Filter.predicate() )), { trigger: true, replace: true });
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
			el: '.pagination_container',
			collection: this.collection
		});

		if (!CurrentUser.get('id')) {
			this.authentication_options_view = new AuthenticationOptionsView({
	            el: '#login_modal_container'
	        });			
		}
    },

	render: function () {
		this.$el.html(render('main/index'));
	},

	goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
