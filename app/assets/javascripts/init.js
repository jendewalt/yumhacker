App = new Router();

$(document).ready(function () {
    // ModalView = new ApplicationModalView({ el: '#application_modal' });
    new HeaderView({ el: 'header' });
    new FooterView({ el: 'footer' });

    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
