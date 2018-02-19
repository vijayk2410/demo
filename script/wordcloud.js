done();
var out = "";
function updates(){


	var xmlhttp = new XMLHttpRequest();
	var url = "script/fetchTweets.php";
	console.log(url);

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
	    for(i = 0; i < arr.length; i++) {
	        out += " " + arr[i].text ;	    	
		   	
//	        document.getElementById("pimage").setAttribute("src", arr[i].profile_image_url);
			document.getElementById("ustatus").innerHTML="<table><tr><td><img src='"+arr[i].profile_image_url +"' alt='Profile Picture' height='150px' width='150px'> </td><td><font size='5' color='blue'>"+ arr[i].text +"</font></td></tr></table>";
			
	    }
	}
	
	
	
	
	
	
	
var myConfig = {
      type: 'wordcloud',
      options: {
        text: out,
        minLength: 5,
        ignore: ["http","https","http:","https:", "Indian", "Applause", "Because", "because", "could", "don’t", "people", "That’s", "that’s", "Their", "their", "there", "these", "thing", "those", "through", "We’re", "we’re", "where", "would"],
        maxItems: 40,
        aspect: 'flow-center',
        rotate: true,
        colorType: 'palette',
        palette: ['#D32F2F', '#5D4037', '#1976D2', '#E53935', '#6D4C41', '#1E88E5', '#F44336', '#795548', '#2196F3', '#EF5350', '#8D6E63', '#42A5F5'],

        style: {
          fontFamily: 'Crete Round',

          hoverState: {
            backgroundColor: '#D32F2F',
            borderRadius: 2,
            fontColor: 'white'
          },
          tooltip: {
            text: '%text: %hits',
            visible: true,

            alpha: 0.9,
            backgroundColor: '#1976D2',
            borderRadius: 2,
            borderColor: 'none',
            fontColor: 'white',
            fontFamily: 'Georgia',
            textAlpha: 1
          }
        }
      },

      source: {
        text: '--Twitter word cloud which <br>represents the trending topics',
         fontColor: '#64B5F6',
        fontSize: 10,
        fontFamily: 'Georgia',
        fontWeight: 'normal',
        marginBottom: '10%'
      }
    };

    zingchart.render({
      id: 'myChart',
      data: myConfig,
      height: 400,
      width: '100%'
    });
    out="";
}//function updates


function done() {
	  setTimeout( function() { 
	  updates(); 
	  done();
	  }, 1000);
}
