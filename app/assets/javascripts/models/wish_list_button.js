WishListButton = Backbone.Model.extend({
    urlRoot: '/api/users/endorsing',

    removeFromWishList: function () {
        var that = this;
        $.ajax({
            url: '/api/listings/' + this.get('listing_id'),
            method: 'DELETE',
            dataType: 'json',
            data: { 
                establishment_id: this.get('establishment_id'),
                wish_list: true
            },
            success: function (response) {
                that.set(response);
                console.log(response)
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    },

    wishList: function () {
        var that = this;
        $.ajax({
            url: '/api/listings/',
            method: 'POST',
            dataType: 'json',
            data: { 
                establishment_id: this.get('establishment_id'),
                wish_list: true
            },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
