Router = Backbone.Router.extend({
    routes: {
        '': 'mainIndex',
        'establishments': 'establishmentsIndex',
        'establishments/search': 'establishmentsSearch',
        'establishments/:id': 'establishmentsShow',
        'establishments/:id/photos': 'establishmentsPhotosIndex',
        'users': 'usersIndex',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/sign_up': 'nothing',
        'users/edit': 'nothing',
        'users/:id': 'usersShow'
    },

    setup: function () {
        if (this.currentView) { this.currentView.remove(); }
        $('<div>', { id: 'main_container' }).appendTo('section');
    },

    mainIndex: function () {
        this.setup();
        this.currentView = new MainIndexView({ el: '#main_container' });
    },

    establishmentsIndex: function () {
        this.setup();
        this.currentView = new EstablishmentsIndexView({ el: '#main_container' });
    },

    establishmentsSearch: function (id) {
        this.setup();
        this.currentView = new EstablishmentsSearchView({ el: '#main_container' });
    },

    establishmentsShow: function (id) {
        this.setup();
        this.currentView = new EstablishmentsShowView({ 
            el: '#main_container',
            model: new Establishment({ id: id })
        });
    },

    establishmentsPhotosIndex: function (id) {
        this.setup();
        this.currentView = new EstablishmentsPhotosIndexView({ 
            el: '#main_container',
            model: new Establishment({ id: id })
        });
    },

    usersIndex: function () {
        this.setup();
        this.currentView = new UsersIndexView({ el: '#main_container' });
    },

    usersShow: function (id) {
        this.setup();
        this.currentView = new UsersShowView({
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
