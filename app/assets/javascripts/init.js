App = new Router();

$(document).ready(function () {
    ModalView = new ApplicationModalView({ el: '#application_modal' });
    new HeaderView({ el: 'header' });
    new FooterView({ el: 'footer' });

    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under

    // Google Analytics pageview tracking
    Backbone.history.on('route', trackPageview);

    function trackPageview() {
        var url;
        url = Backbone.history.getFragment();
        ga('send', 'pageview', "/" + url);
    }
});
