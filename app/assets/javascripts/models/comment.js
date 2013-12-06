Comment = Backbone.Model.extend({
    urlRoot: '/api/users/comment',

    destroy: function (options) {
        var that = this;
        $.ajax({
            url: '/api/users/comment',
            method: 'DELETE',
            dataType: 'json',
            data: { id: this.get('id') },
            success: function (response) {
                console.log(that.collection)
                that.collection.remove(that);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
