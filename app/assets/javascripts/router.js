Router = Backbone.Router.extend({
    routes: {
        '': 'mainIndex',
        'establishments': 'establishmentsIndex',
        'establishments/search': 'establishmentsSearch',
        'establishments/:id': 'establishmentsShow',
        'users': 'usersIndex',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/:id': 'usersShow'
    },

    mainIndex: function () {
        new MainIndexView({ el: '#main_container' });
    },

    establishmentsIndex: function () {
        new EstablishmentsIndexView({ el: '#main_container' });
    },

    establishmentsSearch: function (id) {
        new EstablishmentsSearchView({ el: '#main_container' });
    },

    establishmentsShow: function (id) {
        new EstablishmentsShowView({ 
            el: '#main_container',
            model: new Establishment({ id: id })
        });
    },

    usersIndex: function () {
        new UsersIndexView({ el: '#main_container' });
    },

    usersShow: function (id) {
        new UsersShowView({
            el: '#main_container', 
            model: new User({ id: id })
        });
    },

    nothing: function () {
    }
});

App = new Router();

// why is this here
$(window).on("popstate", function(e) { 
    if (e.originalEvent.state !== null) { 
        e.preventDefault(); 
    } 
});

$(document).ready(function () {
    new ApplicationHeaderView({ el: 'header' });

    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
