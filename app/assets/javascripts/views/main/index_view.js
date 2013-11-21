MainIndexView = Backbone.View.extend({

	initialize: function () {
		this.render();

		this.collection = new EstablishmentCollection();
        this.collection.fetch({ reset: true, data: MainSearch.predicate() });
		
		this.main_search_view = new MainSearchView({
			el: '#establishment_search_container',
			collection: this.collection
		});

		MapView.el = '.map_canvas_container';
		MapView.collection = this.collection;
		MapView.render();
		this.listenTo(this.collection, 'reset', function () { MapView.resetMap(); });
		
		this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
			el: '.establishments_list',
			collection: this.collection
		});

		this.main_btn_container_view = new MainBtnContainerView({
			el: '.main_btn_container'
		});
    },

	render: function () {
		this.$el.html(render('main/index'));
	}
});
