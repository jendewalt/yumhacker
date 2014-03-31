ListsEditAddListingSearchSuggestionListView = Backbone.View.extend({
    events: {
        'click a.biz_name': 'navigate'
    },

    // this.collection = SET OF FOUND ESTABS
    // this.model = LIST

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
        this.$el.html('');  

        if (!this.collection.isEmpty()) {
            this.$el.html(render('lists/edit_add_listing_search_suggestion_list'));

            this.collection.each(function (establishment) {
                this.renderEstablishment(establishment);
            }, this);   
        } else {
            this.$el.html(render('application/no_results'));            
        }
    },

    renderEstablishment: function (establishment) {        
        var establishment_view = new ListsEditAddListingSearchEstablishmentView({
            tagName: 'li',
            model: establishment,
            listings: this.model.listings
        });

        this.$('ul').append(establishment_view.el);
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});
