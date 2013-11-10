MainIndexMapView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(render('main/index_map'));
		var mapOptions = new GoogleMap().get('options');

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	}
});
