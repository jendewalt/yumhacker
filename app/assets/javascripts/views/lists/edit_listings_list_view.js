ListsEditListingsListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.model.listings.assignUrl(this.model.get('id'));
       
        this.listenTo(this.model.listings, 'reset', this.render);
        this.listenTo(this.model.listings, 'add', this.render);
        this.listenTo(this.model.listings, 'destroy', this.render);
        if (this.model.get('id')) {
            this.model.listings.fetch({ reset: true, data: { per: 1000 } });
        } else {
            this.render();
        }
    },

    render: function () {
        this.$el.html('');
        
        if (this.model.listings.length > 0) {
            this.model.listings.each(function (listing) {
                this.renderListing(listing);
            }, this);           
        } else {
            this.$el.html(render('lists/no_listing_results'));
        }   
    },

    renderListing: function (listing) {
        var listing_view = new ListsEditListingView({
            tagName: 'li',
            model: listing
        });

        this.$el.append(listing_view.el);
    },

});
