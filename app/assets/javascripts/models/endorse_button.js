EndorsementButton = Backbone.Model.extend({
    urlRoot: '/api/users/endorse',

    toggle: function () {
        if (this.get('endorsed')) {
            this.unendorse();
        } else {
            this.endorse();
        }
    },

    unendorse: function () {
        var that = this;
        $.ajax({
            url: '/api/users/endorse',
            method: 'DELETE',
            dataType: 'json',
            data: { establishment_id: this.get('id') },
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    },

    endorse: function () {
        var that = this;

        $.ajax({
            url: '/api/users/endorse',
            method: 'POST',
            dataType: 'json',
            data: this.model.toJSON(),
            success: function (response) {
                that.set(response);
            },
            error: function (xhr, status) {
                console.log(status)
            }
        });
    }
});
