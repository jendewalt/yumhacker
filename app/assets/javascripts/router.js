Router = Backbone.Router.extend({
    routes: {
        '': 'main'
    },

    main: function () {
        new MainView({el: '.main_index'});
    }
});

new Router();

$(document).ready(function () {
    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
