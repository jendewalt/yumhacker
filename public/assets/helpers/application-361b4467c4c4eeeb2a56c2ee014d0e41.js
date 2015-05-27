function render(template_path, data) {
	return JST['templates/' + template_path](data);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

function getCurrentLocation(callback) {
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

function fixMapOnScroll() {
    $(window).on('scroll', function () {
        var columns_container_original_offset = $('#columns_container').position().top;
        if ($(window).scrollTop() >= columns_container_original_offset) {
            var sticky_column_offset = $(window).scrollTop() - columns_container_original_offset;
            var left_column_height = $('.column.left').outerHeight();
            var sticky_column_height = $('.sticky_column').outerHeight();
            var maximum_sticky_offset = left_column_height - sticky_column_height;
            if (sticky_column_offset > maximum_sticky_offset) {
                $('.sticky_column').css('top', maximum_sticky_offset);
            } else {
                $('.sticky_column').css('top', sticky_column_offset);
            }
        } else {
            $('.sticky_column').css('top', 0);
        }
    });
}
;
