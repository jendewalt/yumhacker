FollowButton = Backbone.Model.extend({
    urlRoot: '/api/users/following',

    toggle: function () {
        if (CurrentUser.get('id')) {
            if (this.get('following')) {
                this.unfollow();
            } else {
                this.follow();
            }            
        } else {
            this.showAuthenticationOpts();
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
    },

    showAuthenticationOpts: function () {
        $('#login_modal_container').fadeIn('60');
    }
});
