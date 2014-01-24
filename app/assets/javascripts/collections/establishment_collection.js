EstablishmentCollection = Backbone.Collection.extend({
	model: Establishment,

	url: '/api/establishments',

    initialize: function () {
        console.log('EstablishmentCollection Init')
        var params = $.deparam(window.location.search.slice(1));
        this.requested_page = (params.page ? Number(params.page) : 1);
    },

    parse: function (res) {
        this.current_page = res.current_page;
        this.per_page = res.per_page;
        this.total_pages = res.total_pages;
        this.offset = res.offset;
        this.total = res.total;

        return res.establishments;
    },

    predicate: function () {
        return { page: this.requested_page };
    }
});
