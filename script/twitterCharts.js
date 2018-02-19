setInterval(function() {updates()},100);

var chart = new CanvasJS.Chart("chartContainer", {
	title: {
		text: "Twitter Sentiment Analysis"
	},
	axisY: {
		title: "Count",
		suffix: " tweets"
	},
	data: [{
		type: "column",	
		yValueFormatString: "##### tweets",
		indexLabel: "{y}",
		dataPoints: [
			{ label: "POSITIVE", y: 50 },
			{ label: "NEGATIVE", y: 50 },
			{ label: "NEUTRAL", y: 50 }
		]
	}]
});



function updates() {
	
	var xmlhttp = new XMLHttpRequest();
	var url = "script/fetch.php";

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
	    var boilerColor, deltaY, yVal;
		var dps = chart.options.data[0].dataPoints;
		
		
	    
	      //  out += " "+arr[i].p +  " "+arr[i].n +  " "+arr[i].p;
	        //updateChart(250-i,103+i,104+i*2);
	        dps[0] = {label: "POSITIVE " , y: arr[0].p*1, color: "#6B8E23 " };
	        dps[1] = {label: "NEGATIVE " , y: arr[0].n*1, color:  "#FF2500"};
	        dps[2] = {label: "NEUTRAL " , y:arr[0].ne*1, color: "#FF6000"};
		    chart.options.data[0].dataPoints = dps;  
	    
	    out="";
	    chart.options.data[0].dataPoints = dps; 
	   	chart.render();

	}	   
	 
	 
	}







