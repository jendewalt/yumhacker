function render(template_path, data) {
	return JST['templates/' + template_path](data);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

function getCurrentLocation (callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Enable location services to continue.");
            } else if (error.code === error.POSITION_UNAVAILABLE || error.code === error.TIMEOUT) {
                alert('Location is unavailable.');
            } else {
                alert('Could not get location.');
            }
        }, {
            timeout: 10000,
            enableHighAccuracy: true
        });
    } else {
        alert('Current location not supported.');
    }
}

// in case you ever need this ... delete when I deploy
// window.setTimeout($.proxy( function () {
//     this.listenTo(App, 'route', this.removeListeners);
// }, this), 0);

// removeListeners: function (e) {
//     this.stopListening();
// }