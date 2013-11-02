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
        new ApplicationLayout({ 
            el: '.main_index', 
            controller: 'main', 
            action: 'index' 
        });
    },

    establishmentsIndex: function () {
        new ApplicationLayout({ 
            el: '.main_index', 
            controller: 'establishments', 
            action: 'index' 
        });
    },

    establishmentsShow: function (id) {
        new ApplicationLayout({ 
            el: '.main_index',
            controller: 'establishments', 
            action: 'show',
            model: new Establishment({ id: id })
        });
    },

    usersIndex: function () {
        new ApplicationLayout({ 
            el: '.main_index',
            controller: 'users', 
            action: 'index' 
        });
    },

    usersShow: function (id) {
        new ApplicationLayout({
            el: '.main_index', 
            controller: 'users',
            action: 'show', 
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
