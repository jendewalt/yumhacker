Router = Backbone.Router.extend({
    routes: {
        '': 'mainIndex',
        'establishments': 'establishmentsIndex'
    },

    mainIndex: function () {
        new MainIndexView({el: '.main_index'});
    },

    establishmentsIndex: function () {
    	new EstablishmentsIndexView({el: '.main_index'});
    }
});

App = new Router();

$(document).ready(function () {
    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
