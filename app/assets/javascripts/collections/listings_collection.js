ListingsCollection = Backbone.Collection.extend({
    model: Listing,

    comparator: 'created_at',

    initialize: function () {
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));
        this.requested_page = (params.page ? Number(params.page) : 1);

        this.assignUrl(this.list_id);
    },

    parse: function (res) {
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total_pages = res.total_pages;
        this.offset = res.offset;
        this.total = res.total;

        return res.listings;
    },

    assignUrl: function (id) {
        this.url = '/api/lists/' + id + '/listings';
    },

    predicate: function () {
        return { page: this.requested_page };
    }
});
