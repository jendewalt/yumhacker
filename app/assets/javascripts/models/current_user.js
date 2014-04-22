CurrentUser = new (Backbone.Model.extend({
    urlRoot: '/api/users',

    initialize: function () {
        if ($.cookie('current_user')) {
            this.set(JSON.parse($.cookie('current_user')));
        }

        this.fetch({ success: $.proxy(function (mod, res) {
            this.setLocation(mod, res);
        }, this) });

    },

    setLocation: function (mod, res) {
        if (this.get('location')) {
            MainSearch.geocode(this.get('location'));
            EstablishmentSearch.set('location_name', this.get('location'));
        }        
    },

    logged_in: function () {
        return $.cookie('current_user') ? true : false;
    },

    authenticate: function () {
        ModalView.show(new AuthenticationOptionsView({ el: '#inner_modal_content' }));
    }
}))();
