Client = new (Backbone.Model.extend({
    defaults: {
        formatted_address: 'San Francisco, CA',
        redo_search: true,
        zoom: 15
    },

    parseParams: function () {
        var params = $.deparam(window.location.search.slice(1));
        if (params.client) {
            if (params.client.zoom) {
                params.client.zoom = Number(params.client.zoom);
            }
            if (params.client.redo_search) {
                params.client.redo_search = (params.client.redo_search === 'true');
            }
        }
        this.set(params.client, { silent: true });
    },

    predicate: function () {
        return {
            client: {
                formatted_address: this.get('formatted_address'),
                redo_search: this.get('redo_search'),
                zoom: this.get('zoom')
            }
        };
    }
}))();
