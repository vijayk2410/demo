var markers = [{}];
var newAddress;
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
        zoom:4,
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
	var url = "./fetchNews.php";

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
	    var searchBox;
	    var input;
	    var latlng;
	    var geocoder = new google.maps.Geocoder(); 
	    
	    for(i = 0; i < arr.length; i++) {
	      
	       input= " "+arr[i].location;
	       out= "<br><b>" +arr[i].name +"</b><br>" +arr[i].author +"<br>" +arr[i].location +""+"<br>" +arr[i].url +"";
	       geocoder.geocode( { 'address': input }, function(results, status) {
	    	    if (status == google.maps.GeocoderStatus.OK) {
	    	    	
	    	        newAddress = results[0].geometry.location;
	    	        latlng = new google.maps.LatLng(parseFloat(newAddress.lat()),parseFloat(newAddress.lng()));
	    	        
	    	        markers[i] =  {
	    	  	          coords:newAddress,
	    	  	          iconImage:'./icons/newsic.png',
	    	  	          content: out //"<br><b>"+arr[i].name +"</b><br>" +arr[i].author +"<br>" +arr[i].location +""
	    	  	        };
	    	  	       addMarker(markers[i]);
	    	  	       out="";  
	    	  	      
	    	    } });     
	       
	    }//forLoop 
	    
	}
}//udpdates
