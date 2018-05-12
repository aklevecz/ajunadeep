$(document).ready(function() {
	// JavaScript Custom Forms
	$(function() {
		jcf.replaceAll();
	});	


	// MAILCHIMP AJAX FORM
	$('#mc-embedded-subscribe-form').ajaxChimp({
	    callback: function(resp) {
	            if (resp.result === 'success') {
	                $('.formElements').hide();
	                $('.resultMsg').html('Thank you for subscribing').show();
	                $('.resultMsg').addClass('showMsg');
	                fbq('track', 'CompleteRegistration');
		            ga('send', 'send', 'newsletter', 'Sign up');
	            }else{
	            	console.log("Something's broken");	            	
	            }
	    }
	});





});