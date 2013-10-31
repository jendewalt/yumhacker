Router = Backbone.Router.extend({
    routes: {
        '': 'mainIndex',
        'establishments': 'establishmentsIndex',
        'establishments/:id': 'establishmentsShow',
        'users': 'usersIndex',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/:id': 'usersShow'
    },

    mainIndex: function () {
        new MainIndexView({ el: '.main_index' });
    },

    establishmentsIndex: function () {
        new EstablishmentsIndexView({ el: '.main_index' });
    },

    establishmentsShow: function (id) {
        new EstablishmentsShowView({
            el: '.main_index',
            model: new Establishment({ id: id })
        });
    },

    usersIndex: function () {
        new UsersIndexView({ el: '.main_index' });
    },

    usersShow: function (id) {
        new UsersShowView({
            el: '.main_index',
            model: new User({ id: id })
        });
    },

    nothing: function () {
    }
});

App = new Router();

$(window).on("popstate", function(e) { 
    if (e.originalEvent.state !== null) { 
        e.preventDefault(); 
    } 
});

$(document).ready(function () {
    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
