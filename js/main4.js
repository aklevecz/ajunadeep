$(document).ready(function() {

// NA Tour Video Background
	// $('.na-tour').vide('../tour/video/video', {
	// 	className: 'duck',
	// 	position: '50% 50%',
	// 	bgColor: 'transparent'
	// });

	$(function() {
	    jcf.replaceAll();
	    console.log("JCF init from main.js");
	});

	$('#mailchimpForm').ajaxChimp({
	    callback: function(resp) {
	            ga('send', 'send', 'newsletter', 'Sign up');
	            if (resp.result === 'success') {
	                $('.form-elements').hide();
	                $('.form-response').html('Thank you for signing up.<br>We have sent you a confirmation email');
	                fbq('track', 'CompleteRegistration');
	            }
	    },
	    language: 'custom'
	});


});




