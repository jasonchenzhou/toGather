 var posts = <%= posts %>;

 var map, placesList;

function initialize() {
	

  console.log("posts: ");
  console.log(posts);
  var mapOptions = {
    center: new google.maps.LatLng(43.6548988, -79.39661610000002),     //loc of 107 Huron
    zoom: 17,
  }

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  placesList = document.getElementById('places');
  placesList.innerHTML += '<li>' +wow + '</li>'; 



  for (var i = 0; i < posts.length; i++) {
    alert('<%= post.title %>');
  	var post = posts[i];
    var marker = new google.maps.Marker({map: map, title: post.name, position: post.latlng});

    placesList.innerHTML += '<li>' + place.name + '</li>';    //add to result list
  }

google.maps.event.addDomListener(window, 'load', initialize);