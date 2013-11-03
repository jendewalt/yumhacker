FollowButton = Backbone.Model.extend({
    urlRoot: '/api/users/following',

    toggle: function () {
        if (this.get('following')) {
            this.unfollow();
        } else {
            this.follow();
        }
    },

    unfollow: function () {
        var that = this;
        $.ajax({
            url: '/api/users/follow',
            method: 'DELETE',
            dataType: 'json',
            data: { user_id: this.get('user_id') },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    },

    follow: function () {
        var that = this;
        $.ajax({
            url: '/api/users/follow',
            method: 'POST',
            dataType: 'json',
            data: { user_id: this.get('user_id') },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
