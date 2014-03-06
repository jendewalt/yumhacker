FilterCategoriesListView = Backbone.View.extend({
    events: {
        'change select': 'setCategoriesFilter',
    },
    
    initialize: function () {
        this.collection = new CategoriesCollection();
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(Location, 'change', this.render);
        this.collection.fetch({ reset: true });
    },

    render: function () {
        this.$el.html('');

        if (this.currentCenterInSF()) {
            this.$el.html(render('application/filter_categories_list'));
            this.collection.each(function (category) {
                this.renderCategory(category);            
            }, this);     

            $('#categories_options_container #cat_' + Filter.get('categories')).attr('selected', 'selected');       
        } else {
            Filter.set('categories', []);
        }
    },

    renderCategory: function (category) {
        this.$('select').append(render('application/filter_categories_option', category));
    },

    currentCenterInSF: function () {
        var current_center = Location.get('center');
        var current_latLng = new google.maps.LatLng(current_center.lat, current_center.lng);

        var sf_center = { lat: 37.75771766222792, lng: -122.43554750805669 };
        var sf_latLng = new google.maps.LatLng(sf_center.lat, sf_center.lng);
        var sf_sw_bounds = new google.maps.LatLng(37.82554488525898, -122.35143343334965);
        var sf_ne_bounds = new google.maps.LatLng(37.68982819423963, -122.51966158276372);
        var sf_bounds = new google.maps.LatLngBounds(sf_ne_bounds, sf_sw_bounds);

        return sf_bounds.contains(current_latLng);
    },

    setCategoriesFilter: function (e) {
        Filter.set('categories', $(e.target).val());
        // Temp solution until I enable multi category filtering
        Filter.set('category_name', e.target.selectedOptions[0].innerHTML); 
    }
});
