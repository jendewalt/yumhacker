MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex',
		'submit': 'getEndorsedEstablishments'
	},

	initialize: function () {
		this.collection = new EndorsedEstablishmentCollection();
        this.listenTo(this.collection, 'reset', this.renderEstablishments);
		this.collection.fetch({ reset: true, data: { location: 'San Francisco, CA' } });
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index', CurrentUser));
		this.renderEstablishments();
	},

	// getEndorsedEstablishments: function (e) {
	// 	e.preventDefault();
	// 	console.log(e.target[0].value);
	// 	this.collection.fetch({ reset: true, data: { location: e.target[0].value } });		
	// },

	renderEstablishments: function () {
		this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
			el: '.establishments_list',
			collection: this.collection
		});

		this.main_index_map_view = new MainIndexMapView({
			el: '.map_canvas_container',
			collection: this.collection
		});
	},

	goToSubIndex: function (e) {
		e.preventDefault();
		App.navigate(e.target.pathname, { trigger: true });
	}
});
