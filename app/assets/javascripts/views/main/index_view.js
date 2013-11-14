MainIndexView = Backbone.View.extend({
	events: {
		'click .nav': 'goToSubIndex',
		'submit': 'getLocationLatLng',
		'click #from_followed': 'toggleFromFollowed',
		'click #nearby_btn': 'getUserLocation'
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

		this.map_view = new MapView({
			el: '.map_canvas_container',
			collection: this.collection
		});
	},

	getLocationLatLng: function (e) {
		if (e) { e.preventDefault(); }
		var location = e ? $.trim(e.target[0].value) : 'San Francisco, CA';
		
		if (location) {
			var that = this;
	        $.ajax({
	            url: '/api/geolocations',
	            method: 'GET',
	            dataType: 'json',
	            data: { query: location },
	            success: function (response) {
	            	if (response.length) {
		                that.center.lat = response[0].lat;
		                that.center.lng = response[0].lng;
		                that.getEstablishments();            		
	            	}
	            },
	            error: function (xhr, status) {
	                console.log(status)
	            }
	        });			
		}
	},

	getEstablishments: function () {
		this.collection.fetch({ reset: true, data: { lat: this.center.lat, lng: this.center.lng, from_followed: this.fromFollowed, radius: this.radius } });
		this.map_view.setMapCenter(this.center.lat, this.center.lng);
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
	},

	getUserLocation: function () {
		var that = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getNearbyEstablishments);
		} 

		function getNearbyEstablishments(position) {
			that.center.lat = position.coords.latitude;
			that.center.lng = position.coords.longitude;
			that.getEstablishments();
			$('form #location').val('');
		}
	}
});
