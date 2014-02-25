Filter = new (Backbone.Model.extend({
    defaults: {
        relation: 'all',    // Filter collection by all, me or followed
        categories: []     // Filter collection by category (i.e. 'Coffee Shop')
    },

    parseParams: function () {
        var params = $.deparam(window.location.search.slice(1));
        if (params.where && params.where.relation) {
            this.set('relation', params.where.relation, { silent: true });
        }
    },

    predicate: function () {
        return {
            where: {
                relation: this.get('relation'),
                categories: this.get('categories')
            }
        };
    }

}))();
