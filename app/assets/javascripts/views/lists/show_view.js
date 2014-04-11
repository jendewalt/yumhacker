ListsShowView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        Location.set('contained_in', 'radius');
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
    },

    render: function () {
        this.changeHeadInfo();
        this.collection = new ListingsCollection({ list_id: this.model.get('id') });

        this.$el.html(render('lists/show'));

        this.lists_show_title_view = new ListsShowTitleView({
            el: '#list_title_container',
            model: this.model
        });

        this.lists_show_description_view = new ListsShowDescriptionView({
            el: '#list_description_container',
            model: this.model
        });

        this.lists_show_listings_list_view = new ListsShowListingsListView({
            el: 'ol.establishments_list',
            model: this.model,
            collection: this.collection
        });

        if (typeof MainGoogleMap === 'undefined') {
            MainGoogleMap = new MainMapView({
                el: '#map_canvas',
                collection: this.collection
            });
        } else {
            // MainGoogleMap.map.getStreetView().setVisible(false);
            $('.map_canvas_container').html('');
            MainGoogleMap.mapCanvas.appendTo($('.map_canvas_container'));
        }
        MainGoogleMap.map.getStreetView().setVisible(false);
        // This needs to be here if MainGoogleMap already exists because new collection is created above
        MainGoogleMap.collection = this.collection;
        this.listenTo(this.collection, 'reset', function () { MainGoogleMap.render(); });
        fixMapOnScroll();

        this.pagination_view = new ListsShowPaginationView({
            el: '.pagination_container',
            collection: this.collection
        });
    },

    changeHeadInfo: function () {
        this.title = this.model.get('title') + ' | ' + this.model.get('user_full_name') + ' | YumHacker';

        this.description = this.model.get('description') + ' Find and share the best restaurants and bars in ' + Client.get('formatted_address') + ' recommended by people you trust. Create lists of your favorite restaurants to share and see the places other foodies think are the best. Get restaurant and bar photos, reviews, hours and more!';
        
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);            
    }
});