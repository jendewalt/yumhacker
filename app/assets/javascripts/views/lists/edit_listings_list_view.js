ListsEditListingsListView = Backbone.View.extend({
    events: {
        // 'click .nav': 'navigate'
    },

    initialize: function () {
        this.collection.assignUrl(this.model.get('id'));
       
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true });
    },

    render: function () {
        this.$el.html('');
        
        if (this.collection.length > 0) {
            this.collection.each(function (listing) {
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
