ListsEditAddListingSearchModalView = Backbone.View.extend({
        events: {
            'submit': 'searchForEstablishments'
        },

    initialize: function () {
        this.render();

        this.collection = new EstablishmentSuggestionsCollection();
        this.lists_edit_add_listing_search_suggestion_list_view = new ListsEditAddListingSearchSuggestionListView({
            el: '#find_establishment_results_container',
            collection: this.collection,
            model: this.model
        });

        this.listenTo(this.collection, "establishment_selected", this.addEstabToList);

        this.listenTo(EstablishmentSearch, 'geocode', this.fetchResults);
        this.listenTo(EstablishmentSearch, 'error', this.showError);
    },

    render: function () {
        this.$el.html(render('lists/edit_add_listing_search'));
    },

    searchForEstablishments: function (e) {
        e.preventDefault();
        this.query = e.target[0].value;
        var location = e.target[1].value;
        EstablishmentSearch.geocode(e.target[1].value);
        this.$('#find_establishment_results_container').html(render('application/throbber_small'));
    },

    fetchResults: function () {
        this.collection.fetch({
            reset: true,
            data: _.extend(EstablishmentSearch.predicate(), { query: this.query })
        });
    },

    showError: function () {
        this.$('#find_establishment_results_container').html(render('application/geocode_error'));
    },

    addEstabToList: function (selected_estab) {
        if (selected_estab.get('id')) {
            // The establishment is already in the DB
            this.model.listings.trigger('create_listing', selected_estab);
        } else {
            var that = this;
            // First save the estab to DB, then trigger
            selected_estab.save({}, { success: function (new_estab) {
                that.model.listings.trigger('create_listing', new_estab);                
            } });
        }   
    }
});