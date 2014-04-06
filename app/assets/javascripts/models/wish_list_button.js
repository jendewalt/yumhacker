WishListButton = Backbone.Model.extend({

    wishList: function () {
        var that = this;
        $.ajax({
            url: '/api/lists/' + this.get('wish_list_id') + '/listings/',
            method: 'POST',
            dataType: 'json',
            data: { 
                establishment_id: this.get('establishment_id'),
                list_id: this.get('wish_list_id')
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
