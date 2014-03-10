UsersSignUpView = Backbone.View.extend({
    events: {
        'submit': 'triggerGaEventForForm',
        'click .facebook': 'triggerGaEventForSocial',
        'click .twitter': 'triggerGaEventForSocial',
    },

    initialize: function () {
    },

    triggerGaEventForSocial: function (e) {
        e.preventDefault();
        e.stopPropagation();
        ga('send', {
            'hitType': 'event', 
            'eventCategory': 'button', 
            'eventAction': 'click', 
            'eventLabel': 'sign_up',
            'hitCallback': function () {
                location = e.currentTarget.pathname 
            }
        });
    },

    triggerGaEventForForm: function (e) {
        e.preventDefault();
        e.stopPropagation();
        ga('send', {
            'hitType': 'event', 
            'eventCategory': 'button', 
            'eventAction': 'click', 
            'eventLabel': 'sign_up',
            'hitCallback': function () {
                e.target.submit();
            }
        });

    }
});
