// all modification are documented with comments

// standard declaration needed becuse they are private otherwise
var routeStripper = /^[#\/]|\s+$/g;
var rootStripper = /^\/+|\/+$/g;
var isExplorer = /msie [\w.]+/;
var trailingSlash = /\/$/;
var pathStripper = /[?#].*$/;

var History = Backbone.History;

Backbone.History.prototype.start = function(options) {
    if (History.started) throw new Error("Backbone.history has already been started");
    History.started = true;

    this.options          = _.extend({root: '/'}, this.options, options);
    this.root             = this.options.root;
    this._wantsHashChange = this.options.hashChange !== false;
    this._wantsPushState  = !!this.options.pushState;
    this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
    var fragment          = this.getFragment();
    var docMode           = document.documentMode;
    var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

    this.root = ('/' + this.root + '/').replace(rootStripper, '/');

    if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
    }

    if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
    } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
    } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
    }

    this.fragment = fragment;

    // store query params to be check against later
    this.search = this.location.search;

    var loc = this.location;
    var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

    if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !atRoot) {
            this.fragment = this.getFragment(null, true);
            this.location.replace(this.root + this.location.search + '#' + this.fragment);
            return true;
        } else if (this._hasPushState && atRoot && loc.hash) {
            this.fragment = this.getHash().replace(routeStripper, '');
            this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }
    }

    if (!this.options.silent) return this.loadUrl();
};

Backbone.History.prototype.checkUrl = function(e) {
    var current = this.getFragment();

    // Grab a reference to the query string
    var search = this.location.search;

    if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
    }

    // return only if path and query did not change
    if (current === this.fragment && search === this.search) return false;
    if (this.iframe) this.navigate(current);
    this.loadUrl();
};

Backbone.History.prototype.loadUrl = function(fragment) {
    fragment = this.fragment = this.getFragment(fragment);

    // store query params to be check against later
    this.search = this.location.search;

    return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
            handler.callback(fragment);
            return true;
        }
    });
};

Backbone.History.prototype.navigate = function (fragment, options) {
    if (!History.started) return false;
    if (!options || options === true) options = {trigger: !!options};

    var url = this.root + (fragment = this.getFragment(fragment || ''));

    fragment = fragment.replace(pathStripper, '');

    // grab query params
    var search = url.replace(/^.*\?/, '?');

    // return only if path and query did not change
    if (this.fragment === fragment && this.search === search) return;
    this.fragment = fragment;

    // store query params to be check against later
    this.search = search;

    // Only strip the last character if it is a '/'
    if (fragment === '' && url !== '/' && url.charAt(url.length - 1) === '/') url = url.slice(0, -1);

    if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

    } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
            if(!options.replace) this.iframe.document.open().close();
            this._updateHash(this.iframe.location, fragment, options.replace);
        }
    } else {
        return this.location.assign(url);
    }
    if (options.trigger) return this.loadUrl(fragment);
}

// overwrite default backbone history
Backbone.history = new History;
