ListsCollection = Backbone.Collection.extend({
    model: List,

    parse: function (res) {
        return res.lists;
    },

    assignUrl: function (id) {
        this.url = '/api/users/' + id + '/lists';
    }
});
