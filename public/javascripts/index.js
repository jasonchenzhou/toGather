
    // var video= document.getElementById('vedio');
    // video.playbackRate = 0.5;

	var menupush = function() {
	  /* Push the body and the nav over by 285px over */
	  $('.icon-menu').click(function() {
	    $('#nav').animate({
	      left: "0%"
	    }, 200);
	  });

	  /* Then push them back */
	  $('.icon-close').click(function() {
	    $('#nav').animate({
	      left: "-30%"
	    }, 200);

	  });
	};

	$(document).ready(menupush);
