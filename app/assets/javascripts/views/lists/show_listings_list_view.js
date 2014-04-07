ListsShowListingsListView = Backbone.View.extend({
    events: {
        'click .nav': 'navigate'
    },

    initialize: function () {
        this.collection.assignUrl(this.model.get('id'));
        this.listenTo(this.collection, 'reset', this.render);
        this.collection.fetch({ reset: true, data: this.collection.predicate() });
    },

    render: function () {
        this.$el.html('');
        
        if (this.collection.length > 0) {
            this.collection.each(this.renderListing, this);           
        } else {
            this.$el.html(render('lists/no_listing_results'));
        }   
    },

    renderListing: function (listing) {
        this.$el.append(new ListsShowListingView({
            tagName: 'li',
            model: listing
        }).el);
    },

    navigate: function (e) {
        e.preventDefault();
        App.navigate(e.target.pathname, { trigger: true });
    }
});