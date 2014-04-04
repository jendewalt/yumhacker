ListsEditView = Backbone.View.extend({
    events: {
    },

    // this.model = LIST
    // this.collection = LISTINGS

    initialize: function () {
        this.model.listings = new ListingsCollection();
        this.listenToOnce(this.model, 'sync', this.render);
        this.listenTo(this.model, 'all', this.foo);
        this.model.get('id') ? this.model.fetch() : this.render();
    },

    foo: function (e) {
        console.log(e)        
    },

    render: function (e) {
        console.log('main init')
        this.$el.html(render('lists/edit', this.model));

        this.lists_edit_list_info_view = new ListsEditListInfoView({
            model: this.model
        });

        this.lists_edit_listings_container_view = new ListsEditListingsContainerView({
            el: '#listings_container',
            model: this.model
        });

        if (typeof MainGoogleMap === 'undefined') {
            MainGoogleMap = new MainMapView({
                el: '#map_canvas',
                collection: this.model.listings
            });
        } else {
            MainGoogleMap.map.getStreetView().setVisible(false);
            $('.map_canvas_container').html('');
            MainGoogleMap.mapCanvas.appendTo($('.map_canvas_container'));
        }
        MainGoogleMap.map.getStreetView().setVisible(false);
        // This needs to be here if MainGoogleMap already exists because new collection is created above
        MainGoogleMap.collection = this.model.listings;
        this.listenTo(this.model.listings, 'reset', function () { MainGoogleMap.render(); });
        this.listenTo(this.model.listings, 'add', function () { MainGoogleMap.render(); });
        this.listenTo(this.model.listings, 'remove', function () { MainGoogleMap.render(); });
        fixMapOnScroll();
        
    }
});
