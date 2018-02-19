var markers = [{coords: {lat:18.503930,lng:73.838210},
	iconImage:"./icons/twitter.png",
	content:"out"}];

 var map,marker,searchBox,places;
 var service;
  function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });
        
        // if(props.cords)
        // {
        //   marker.setPosition()
        // }

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
  function initMap(){
      // Map options
      var options = {
        zoom:7,
        center:{lat:18.503930,lng:73.838210}

      }

      // New map
     map = new google.maps.Map(document.getElementById('map'), options);
     service = new google.maps.places.PlacesService(map);

    // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

    }


$(document).ready( function() {
 done();
});
 
function done() {
	  setTimeout( function() { 
	  updates(); 
	  done();
	  }, 100);
}
 
function updates() {
	
	var xmlhttp = new XMLHttpRequest();
	var url = "./fetchTweets.php";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        myFunction(this.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function myFunction(response) {
	    var arr = JSON.parse(response);
	    var i;
	    var out = "";

	    for(i = 0; i < arr.length; i++) {
	        out += "<br><b>" +
	        arr[i].screen_name +
	        "</b><br>" +
	        arr[i].text +
	        "<br>" +
	        arr[i].created_at +
	        "";
	        markers[i] =  {
	          coords:{lat:18.503930,lng:73.838210+i},
	          iconImage:'./icons/twitter.png',
	          content:out

	        };
	       addMarker(markers[i]);
	       out=""
	    } 
	    //addMarker(marker[i]);
	    //initMap();
	    //out += "</table>";
	    //document.getElementById("id01").innerHTML = out;
	}
}//udpdates
