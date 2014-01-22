MainIndexView = Backbone.View.extend({
	events: {
		'change #redo_search': 'toggleRedoSearch'
	},

	initialize: function () {
		this.render();
		
		this.collection = new EstablishmentCollection();

        this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });

		this.listenTo(MainSearch, 'change', this.updateCollection);

		this.listenTo(MainSearch, 'geocode', this.updateCollection);

		this.listenTo(Filter, 'change', this.updateCollection);

		if (typeof GoogleMap === 'undefined') {
			GoogleMap = new MapView({
				el: '#map_canvas'
			})
		} 

		GoogleMap.collection = this.collection;
		this.listenTo(this.collection, 'reset', function () { GoogleMap.resetMap(); });

		this.listenTo(GoogleMap, 'bounds_changed', function (position) {
			console.log(position)
			Filter.setPosition(position);
		});
		
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
		this.$('.establishments_list').html(render('application/throbber_small'));
	},

	updateCollection: function () {
		App.navigate(window.location.pathname + '?' + $.param(_.extend(MainSearch.predicate(), Filter.predicate() )), { trigger: true, replace: true });
	},

	toggleRedoSearch: function (e) {
		Filter.set('redo_search', e.target.checked);
	}
});
