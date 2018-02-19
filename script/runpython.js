topicsList();


function setTopic(str){
	document.cookie="topic_name="+str;
	var c=document.cookie;
	console.log(c);
	//alert(str);
	ll();
	
}

function startStreaming() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "./wordcloud.html", true);
    xmlhttp.send();
}

function ll() {
    document.getElementById("main").innerHTML='<object type="text/html" height="1000px" width="1100px" data="./wordcloud.php" ></object>';
}

function ChangePage(str) {
	  if (str=="") {
	    document.getElementById("txtHint").innerHTML="";
	    return;
	  }
	  if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	  } else { // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange=function() {
	    if (this.readyState==4 && this.status==200) {
	      document.getElementById("txtHint").innerHTML=this.responseText;
	    }
	  }
	  xmlhttp.open("GET","wordcloud.php",true);
	  xmlhttp.send();
	}

function topicsList() {
	
	var xmlhttp = new XMLHttpRequest();
	var url = "./fetchTopics.php";

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        myFunction(this.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function myFunction(response) {
	    var arr = JSON.parse(response);
	    var i,j;
	    var tp="";
	    var out="<form><select name='topics' onchange='setTopic(this.value)'> <option> Select Existing Topic </option>";
	    
	    for(i = 0; i < arr.length; i++) {
	    	if(arr[i].topic!=null){
	    		tp=arr[i].topic;

	    		console.log(tp);
	    	out += "<option value='"+ tp+"'>"+arr[i].topic+"</option>";
	    	}
	    	}
	    out+="</select></form>";
	   document.getElementById("topic_list").innerHTML=out;
	    
	}
}//udpdates
