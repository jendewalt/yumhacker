Comment = Backbone.Model.extend({
    urlRoot: '/api/users/comment',

    // destroy_comment: function () {
    //     var that = this;
    //     $.ajax({
    //         url: '/api/users/comment',
    //         method: 'DELETE',
    //         dataType: 'json',
    //         data: { id: this.get('id') },
    //         success: function (response) {
    //             that.set(response);
    //             console.log(response)
    //         },
    //         error: function (xhr, status) {
    //             console.log(status)
    //         }
    //     });
    // }
});
