// function startStreaming() {
//  	var xmlhttp = new XMLHttpRequest();
// 	var url = "http://10.20.56.34/WEBAPPS/TSA/script/runsh.php";
// 	xmlhttp.open("GET", url, true);
// 	xmlhttp.send();
// }

// //refresh page
// function done() {
//     setTimeout( function() { 
//     updates(); 
//     done();
//     }, 100);
// }

// function updates() {
	
// 	var xmlhttp = new XMLHttpRequest();
// 	var url = "http://10.20.56.34/WEBAPPS/TSA/script/fetchTweets.php";

// 	xmlhttp.onreadystatechange = function() {
// 	    if (this.readyState == 4 && this.status == 200) {
// 	        myFunction(this.responseText);
// 	    }
// 	}
// 	xmlhttp.open("GET", url, true);
// 	xmlhttp.send();

// 	function myFunction(response) {
// 	    var arr = JSON.parse(response);
// 	    var i;
// 	    var out = "";

// 	    for(i = 0; i < arr.length; i++) {
// 	        out += "<br><b>" +
// 	        arr[i].screen_name +
// 	        "</b><br>" +
// 	        arr[i].text +
// 	        "<br>" +
// 	        arr[i].created_at +
// 	        "";
// 	        markers[i] =  {
// 	          coords:{lat:18.503930,lng:73.838210+i},
// 	          iconImage:'http://10.20.56.34/WEBAPPS/TSA/script/icons/twitter.png',
// 	          content:out

// 	        };
// 	       addMarker(markers[i]);
// 	       out=""
// 	    } 
// 	    //addMarker(marker[i]);
// 	    //initMap();
// 	    //out += "</table>";
// 	    //document.getElementById("id01").innerHTML = out;
// 	}
// }//udpdates