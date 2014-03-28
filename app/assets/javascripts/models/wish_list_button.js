WishListButton = Backbone.Model.extend({

    wishList: function () {
        console.log(this)
        var that = this;
        $.ajax({
            url: '/api/lists/' + this.get('wish_list_id') + '/listings/',
            method: 'POST',
            dataType: 'json',
            data: { 
                establishment_id: this.get('establishment_id'),
                list_id: this.get('wish_list_id')
            },
            success: function (response) {
                that.set('wish_listed', response.wish_listed);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
