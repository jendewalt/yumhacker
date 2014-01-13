Router = Backbone.Router.extend({
    initialize: function () {
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+$/, 'establishmentsShow');
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/photos$/, 'establishmentsPhotosIndex');
    },

    routes: {
        '': 'mainIndex',
        '_=_': 'redirectToHome',
        'restaurants': 'establishmentsIndex',
        'restaurants/search': 'establishmentsSearch',
        'users': 'nothing',
        'users/sign_up/find_facebook_friends': 'signUpFindFacebookFriends',
        'users/find_facebook_friends': 'findFacebookFriends',
        'users/search': 'usersSearch',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/sign_up': 'nothing',
        'users/edit': 'editProfile',
        'users/:id(/:section)': 'usersShow',
        'contact': 'contactPage',
        'terms': 'termsPage',
        'privacy': 'privacyPage',
        // 'neighborhoods': 'neighborhoodsPage',
    },

    setup: function () {
        if (this.currentView) { 
            this.currentView.remove(); 
        } else {
            $('section').html('');
        }
        $('<div>', { id: 'main_container' }).appendTo('section');
    },

    mainIndex: function () {
        this.setup();
        this.currentView = new MainIndexView({ el: '#main_container' });
    },

    redirectToHome: function () {
        var browser = $.ua.browser.name
        if (browser && browser.toLowerCase() == 'firefox') {
            window.location = '/';
        } else {
            App.navigate('');
        }
    },

    establishmentsIndex: function () {
        this.setup();
        this.currentView = new EstablishmentsIndexView({ el: '#main_container' });
    },

    establishmentsSearch: function (id) {
        this.setup();
        this.currentView = new EstablishmentsSearchView({ el: '#main_container' });
    },

    establishmentsShow: function (path) {
        var slug = window.location.pathname.replace(/.*\//, '');
        this.setup();
        this.currentView = new EstablishmentsShowView({ 
            el: '#main_container',
            model: new Establishment({ id: slug })
        });
    },

    establishmentsPhotosIndex: function (id) {
        var slug = window.location.pathname.replace(/\/photos/, '').replace(/.*\//, '');
        this.setup();
        this.currentView = new EstablishmentsPhotosIndexView({ 
            el: '#main_container',
            model: new Establishment({ id: slug })
        });
    },

    usersShow: function (id, section) {
        this.setup();
        this.currentView = new UsersShowView({
            el: '#main_container', 
            model: new User({ id: id }),
            section: section
        });
    },

    usersSearch: function () {
        this.setup();
        this.currentView = new UsersSearchView({ el: '#main_container' });
    },

    editProfile: function () {
        this.currentView = new UsersEditView({ el: 'section' });
    },

    signUpFindFacebookFriends: function () {
        this.setup();
        this.currentView = new UsersSignUpFindFacebookFriendsView({ 
            el: '#main_container',
            model: new User({ id: CurrentUser.get('id') }) 
        });
    },

    findFacebookFriends: function () {
        this.setup();
        this.currentView = new UsersFindFacebookFriendsView({ 
            el: '#main_container',
            model: new User({ id: CurrentUser.get('id') }) 
        });
    },

    contactPage: function () {
        this.setup();
        this.currentView = new ContactView({ el: '#main_container' })
    },

    termsPage: function () {
        this.setup();
        this.currentView = new TermsView({ el: '#main_container' })
    },

    privacyPage: function () {
        this.setup();
        this.currentView = new PrivacyView({ el: '#main_container' })
    },

    // neighborhoodsPage: function () {
    //     this.setup();
    //     this.currentView = new NeighborhoodView({ el: '#main_container' })
    // },

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
    new HeaderView({ el: 'header' });
    new FooterView({ el: 'footer' });

    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
