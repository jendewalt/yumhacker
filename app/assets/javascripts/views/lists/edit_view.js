ListsEditView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        Location.set('contained_in', 'radius');
        this.model.listings = new ListingsCollection();
        this.model.get('id') ? this.model.fetch({ success: $.proxy(function (model) {
            if (model.get('user_id') === CurrentUser.get('id')) { 
                this.render();
            } else {
                App.navigate('', { trigger: true });
            }
        }, this) }) : this.render();
    },

    render: function () {
        this.changeHeadInfo();
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
        MainGoogleMap.render();
        this.listenTo(this.model.listings, 'reset', function () { MainGoogleMap.render(); });
        this.listenTo(this.model.listings, 'add', function () { MainGoogleMap.render(); });
        this.listenTo(this.model.listings, 'remove', function () { MainGoogleMap.render(); });
        fixMapOnScroll();        
    },

    changeHeadInfo: function () {
        this.title = this.model.get('title') + ' | ' + this.model.get('user_full_name') + ' | Edit | YumHacker';

        this.description = this.model.get('description') + ' Find and share the best restaurants and bars in ' + Client.get('formatted_address') + ' recommended by people you trust. Create lists of your favorite restaurants to share and see the places other foodies think are the best. Get restaurant and bar photos, reviews, hours and more!';
        
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);            
    }
});
