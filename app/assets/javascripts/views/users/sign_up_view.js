UsersSignUpView = Backbone.View.extend({
    events: {
        'submit': 'triggerGaEventForForm',
        'click .facebook': 'triggerGaEventForSocial',
        'click .twitter': 'triggerGaEventForSocial',
    },

    title: 'Sign Up | YumHacker',

    description: 'Find ' + Client.get('formatted_address') + ' restaurants and bars endorsed by people you trust. Get restaurant and bar photos, reviews, hours and more!',

    initialize: function () {
        App.eventAggregator.trigger('domchange:title', this.title);
        App.eventAggregator.trigger('domchange:description', this.description);
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
