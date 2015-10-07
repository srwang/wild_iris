$(document).ready(function(){
	console.log('linked')

	$('#submit-secret-phrase').click(function(){
		var secretPhrase = $('#secret-phrase').val();
		if (/voice\b/.test(secretPhrase) && /lost\b/.test(secretPhrase) && /presence\b/.test(secretPhrase) && /permit\b/.test(secretPhrase) && /noises\b/.test(secretPhrase) && /glinting\b/.test(secretPhrase) && /winter\b/.test(secretPhrase) ){
			$('footer').html('');
			$('footer').append("<h3>Congratulations, you've collected all the secrets! Find and read the remaining poems in the landscape. Thank you for playing Wild Iris.</h3>")

			$('.hidden-item-container').show();
		} else {
			alert('Sorry, please collect all the secrets.')
		}
	})

	$.get("http://ipinfo.io/", function(response) {
	    var city = response.city
	    var region = response.region 

	    $.get('http://api.wunderground.com/api/4b6e233436935f0e/conditions/q/' + region + '/' + city + '.json', function(response){
	    	var weather = response.current_observation.weather

	    	$('#music-box').append("<p>Skies are " + weather.toLowerCase() + " in " + city + ", " + region + "</p>")
	    })
	}, "jsonp");

})

//noises voice lost presence capitulation winter permit glinting