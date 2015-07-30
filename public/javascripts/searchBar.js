function initialize(){
    var input = (document.getElementById('autoKeyword'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
    	var place = autocomplete.getPlace();
    	if(!place.geometry){
    		window.alert("Autocomplete's returned place contains no geometry");
    		return;
    	}
    	else{
    		document.getElementById('searchlatlng').value = place.geometry.location;
    	}
    })
}


google.maps.event.addDomListener(window, 'load', initialize);