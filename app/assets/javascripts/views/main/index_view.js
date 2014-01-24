MainIndexView = Backbone.View.extend({
    events: {
        'change #redo_search': 'toggleRedoSearch'
    },

    initialize: function () {
        this.render();
        console.log('Main Index init');
        this.collection = new EstablishmentCollection();

        var params = _.extend(Location.predicate(), Filter.predicate(), Client.predicate(), this.collection.predicate());
        this.collection.fetch({ reset: true, data: params });

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
        
        this.filter_view = new FilterView({
            el: '#main_filter_container',
        });

        this.listenTo(this.collection, 'reset', function () { GoogleMap.render(); });
        this.listenTo(Location, 'change', this.updateCollection);
        this.listenTo(Filter, 'change', this.updateCollection);

        this.main_index_establishments_list_view = new MainIndexEstablishmentsListView({
            el: '.establishments_list',
            collection: this.collection
        });

        this.pagination_view = new EstablishmentsIndexPaginationView({
            el: '.pagination_container',
            collection: this.collection
        });

        // if (!CurrentUser.get('id')) {
        //     this.authentication_options_view = new AuthenticationOptionsView({
        //         el: '#login_modal_container'
        //     });         
        // }
    },

    render: function () {
        this.$el.html(render('main/index'));
        this.$('.establishments_list').html(render('application/throbber_small'));
    },

    updateCollection: function (e) {
        console.log('update collection')
        var params = _.extend(Location.predicate(), Filter.predicate(), Client.predicate());
        this.collection.fetch({ reset: true, data: params });
        App.navigate(window.location.pathname + '?' + $.param(params), { trigger: false, replace: false });
    },

    toggleRedoSearch: function (e) {
        Client.set('redo_search', e.target.checked);
    }
});
