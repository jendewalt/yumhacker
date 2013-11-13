MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex',
		'submit': 'getEstablishments',
		'click #from_followed': 'toggleFromFollowed'
	},

	initialize: function () {
		if (CurrentUser.logged_in()) {
			this.fromFollowed = true;
		} else {
			this.fromFollowed = false;
		}

		this.collection = new EndorsedEstablishmentCollection();
        this.listenTo(this.collection, 'reset', this.renderEstablishments);
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index', CurrentUser));
		this.getEstablishments();
	},

	getEstablishments: function (e) {
		var location = e ? e.target[0].value : 'San Francisco, CA';
		if (e) {
			e.preventDefault();
		}
		this.collection.fetch({ reset: true, data: { location: location, from_followed: this.fromFollowed, radius: this.radius } });		
	},

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
	},

	toggleFromFollowed: function (e) {
		this.fromFollowed = !this.fromFollowed;
		this.getEstablishments();
	}
});
