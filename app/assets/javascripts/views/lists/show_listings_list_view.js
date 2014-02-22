ListsShowListingsListView = Backbone.View.extend({
    events: {
        'click .nav': 'goToSubIndex'
    },

    initialize: function () {
        this.collection.fetch({ reset: true });
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {
        this.$el.html('');
        
        if (this.collection.length > 0) {
            this.collection.each(function (listing) {
                this.renderListing(listing);
            }, this);           
        } else {
            this.$el.html('');
            this.$el.html(render('lists/no_listing_results'));
        }   
    },

    renderListing: function (listing) {
        var listing_view = new ListsShowListingView({
            tagName: 'li',
            model: listing
        });

        this.$el.append(listing_view.el);
        console.log('Listing appended');
    },

    goToSubIndex: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});