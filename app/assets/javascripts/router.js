Router = Backbone.Router.extend({
    initialize: function () {
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+$/, 'establishmentsShow');
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/photos$/, 'establishmentsPhotosIndex');

        this.eventAggregator = _.extend({}, Backbone.Events);
        this.eventAggregator.on('domchange:title', this.changeTitle, this);
        this.eventAggregator.on('domchange:description', this.changeDescription, this);
    },

    routes: {
        '': 'homePage',
        // '': 'mainIndex',
        '_=_': 'redirectToHome',
        'restaurants': 'mainIndex',
        'restaurants/search': 'establishmentsSearch',
        'users/sign_up/find_facebook_friends': 'signUpFindFacebookFriends',
        'users/find_facebook_friends': 'findFacebookFriends',
        'users/search': 'usersSearch',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/sign_up': 'usersSignUp',
        'users/edit': 'editProfile',
        'users/:id/categories': 'nothing',
        'users/:id(/:section)': 'usersShow',
        'users': 'nothing',
        'lists/:id/edit': 'listsEdit',
        'lists/new': 'listsNew',
        'lists/:id': 'listsShow',
        'contact': 'contactPage',
        'terms': 'termsPage',
        'privacy': 'privacyPage',
    },

    setup: function () { 
        $(window).unbind('scroll'); 
        if (this.currentView) { 
            this.currentView.remove(); 
        } else {
            $('section').html('');
        }
        $('<div>', { id: 'main_container' }).appendTo('section');
    },

    changeTitle: function (title) {
        $(document).attr('title', title);
    },

    changeDescription: function (desc) {
        $('meta[name=description]').remove();
        $('head').append( '<meta name="description" content="' + desc + '">' );
    },

    homePage: function () {
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));
        if (_.isEmpty(params)) {
            Location.set(Location.defaults, { silent: true });
            Filter.set(Filter.defaults, { silent: true });
            Client.set(Client.defaults);
        } else {
            Location.parseParams();
            Filter.parseParams();
            Client.parseParams();
        }
        this.setup();
        this.currentView = new HomePageView({ el: '#main_container' });
    },

    mainIndex: function () {
        var params = $.deparam(decodeURIComponent(window.location.search.slice(1)));
        if (_.isEmpty(params)) {
            Location.set(Location.defaults, { silent: true });
            Filter.set(Filter.defaults, { silent: true });
            Client.set(Client.defaults);
        } else {
            Location.parseParams();
            Filter.parseParams();
            Client.parseParams();
        }
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
        this.currentView = new UsersEditView({ el: 'section div' });
    },

    usersSignUp: function () {
        this.currentView = new UsersSignUpView({ el: 'section div' });
    },

    usersSignIn: function () {
        this.currentView = new UsersSignInView({ el: 'section div' });
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

    listsEdit: function (id) {
        this.setup();
        this.currentView = new ListsEditView({ 
            el: '#main_container',
            model: new List({ id: id })
        });
    },

    listsNew: function () {
        this.setup();
        this.currentView = new ListsEditView({ 
            el: '#main_container',
            model: new List({
                title: CurrentUser.get('full_name') + '\'s Favorite Spots',
                description: CurrentUser.get('full_name') + '\'s Favorite Spots List.'
            })
        });
    },

    listsShow: function (id) {
        this.setup();
        this.currentView = new ListsShowView({ 
            el: '#main_container',
            model: new List({ id: id })
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

    nothing: function () {
    }
});
