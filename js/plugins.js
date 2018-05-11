// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


// Magnific Popup

$(document).ready(function() {
    $('.mobile-menu-btn').magnificPopup({
        type:'inline'
    });

    $('.demo-btn').magnificPopup({
        type:'inline'
    });

    $('.contact-btn').magnificPopup({
        type:'inline'
    });

});


// AJAX Chimp

$('.sign-up-form').ajaxChimp({
    callback: function(resp) {
            ga('send', 'send', 'newsletter', 'Sign up');
            if (resp.result === 'success') {
                $('.form-elements').hide();
                $('.form-response').html('Thank you for signing up.<br>We have sent you a confirmation email').show();
            }
    },
    language: 'custom'
});

$('.demo-form').ajaxChimp({
    callback: function(resp) {
            ga('send', 'send', 'newsletter', 'Sign up');
            if (resp.result === 'success') {
                $('.form-elements').hide();
                $('.form-response').html('Thank you for signing up.<br>We have sent you a confirmation email').show();
            }
    },
    language: 'custom'
});




