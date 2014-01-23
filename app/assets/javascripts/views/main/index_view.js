MainIndexView = Backbone.View.extend({
    events: {
        'change #redo_search': 'toggleRedoSearch'
    },

    initialize: function () {
        this.render();
        
        this.collection = new EstablishmentCollection();

        this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate(), this.collection.predicate()) });

        if (typeof GoogleMap === 'undefined') {
            GoogleMap = new MapView({
                el: '#map_canvas',
                collection: this.collection
            });
        } else {
            $('.map_canvas_container').html('');
            GoogleMap.mapCanvas.appendTo($('.map_canvas_container'));
        }
        // This needs to be here if GoogleMap already exists becuase new collection is created above
        GoogleMap.collection = this.collection;
        this.listenTo(this.collection, 'reset', function () { GoogleMap.render(); });

        this.listenTo(MainSearch, 'geocode', this.updateCollection);
        this.listenTo(MainSearch, 'change', this.updateCollection);

        this.listenTo(Filter, 'change', this.updateCollection);
        this.listenTo(Filter, 'map_change', this.updateCollectionReset);
        
        // this.filter_view = new FilterView({
        //  el: '#main_filter_container',
        // });

        this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
            el: '.establishments_list',
            collection: this.collection
        });

        this.pagination_view = new EstablishmentsIndexPaginationView({
            el: '.pagination_container',
            collection: this.collection
        });

        if (!CurrentUser.get('id')) {
            this.authentication_options_view = new AuthenticationOptionsView({
                el: '#login_modal_container'
            });         
        }
    },

    render: function () {
        this.$el.html(render('main/index'));
        this.$('.establishments_list').html(render('application/throbber_small'));
    },

    updateCollection: function () {
        App.navigate(window.location.pathname + '?' + $.param(_.extend(MainSearch.predicate(), Filter.predicate() )), { trigger: true, replace: false });
    },

    updateCollectionReset: function () {

        console.log('update collection reset ')
        // Collection fetch instead of navigate to prevent map from flashing on move or zoom
        this.collection.fetch({ reset: true, data: _.extend(MainSearch.predicate(), Filter.predicate()) });

        App.navigate(window.location.pathname + '?' + $.param(_.extend(MainSearch.predicate(), Filter.predicate() )), { trigger: false, replace: false });
    },

    toggleRedoSearch: function (e) {
        Filter.set('redo_search', e.target.checked, { silent: true });
    }
});
