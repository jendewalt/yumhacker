MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex',
		'submit': 'getLocationLatLng',
		'click #from_followed': 'toggleFromFollowed'
	},

	initialize: function () {
		if (CurrentUser.logged_in()) {
			this.fromFollowed = true;
		} else {
			this.fromFollowed = false;
		}

		this.center = {
			lat: 37.7749295,
			lng: -122.4194155
		}

		this.collection = new EstablishmentCollection();
        this.listenTo(this.collection, 'reset', this.renderEstablishments);
        this.collection.fetch({ reset: true, data: { lat: this.center.lat, lng: this.center.lng, from_followed: this.fromFollowed, radius: this.radius } });
		this.render();
	},

	render: function () {
		this.$el.html('');
		this.$el.html(render('main/index', CurrentUser));

		this.main_index_map_view = new MainIndexMapView({
			el: '.map_canvas_container',
			collection: this.collection
		});
	},

	getLocationLatLng: function (e) {
		if (e) { e.preventDefault(); }
		var location = e ? e.target[0].value : 'San Francisco, CA';
		
		var that = this;
        $.ajax({
            url: '/api/geolocations',
            method: 'GET',
            dataType: 'json',
            data: { query: location },
            success: function (response) {
                that.center.lat = response[0].lat;
                that.center.lng = response[0].lng;
                that.getEstablishments();
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
	},

	getEstablishments: function () {
		this.collection.fetch({ reset: true, data: { lat: this.center.lat, lng: this.center.lng, from_followed: this.fromFollowed, radius: this.radius } });
		this.main_index_map_view.setMapCenter(this.center.lat, this.center.lng);
	},

	renderEstablishments: function () {
		this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
			el: '.establishments_list',
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
