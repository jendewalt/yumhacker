FavoriteButton = Backbone.Model.extend({
    urlRoot: '/api/users/favorite',

    toggle: function () {
        if (CurrentUser.logged_in()) {
            if (this.get('user_favoriting')) {
                this.unfavorite();
            } else {
                this.favorite();
            } 
        } else {
            CurrentUser.authenticate();
        }
    },

    unfavorite: function () {
        var that = this;
        $.ajax({
            url: '/api/users/favorite',
            method: 'DELETE',
            dataType: 'json',
            data: { list_id: this.get('list_id') },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    },

    favorite: function () {
        var that = this;
        $.ajax({
            url: '/api/users/favorite',
            method: 'POST',
            dataType: 'json',
            data: { list_id: this.get('list_id') },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
