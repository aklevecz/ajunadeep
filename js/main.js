$(document).ready(function() {
	$('#mobMusic').click(function() {
		console.log("mobMusic clicked")
		$(".mobile-drop-down").toggleClass('dd', 'mobile-drop-down', "easeOutSine");
		// $(".mobile-drop-down").animate({height: 200}, 333)
		
	});


	$('.demo-form').submit(function(e) {
		e.preventDefault()
		var payload = {
			artist: $(this).find('input[name=artist]').val(),
			email: $(this).find('input[name=email]').val(),
			title: $(this).find('input[name=title]').val(),
			link: $(this).find('input[name=link]').val(),
		}
		var form = $(this)
		$.post('/api/demo', payload, function(result) {
			form.find('input').val('')
			$('#success-message').prepend('<h3>Thank you for your submission</h3><p>Unfortunately due to the high number of demos we receive, we are unable to respond to every submission. If your demo shows potential, a member of the A&R team will get back to you promptly.</p>')
		}, "text json").fail(function() {
			$('#success-message').prepend('<h3>Sorry, an error occured</h3><p>Please try again later...</p>')
		})
		return false;
	})

// NA Tour Video Background
	$('.na-tour').vide('../tour/video/video', {
		className: 'duck',
		position: '50% 50%',
		bgColor: 'transparent'
	});

	$(function() {
	    jcf.replaceAll();
	    console.log("JCF init from main.js");
	});


});




