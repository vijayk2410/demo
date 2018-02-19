var i=0;
var ii=0;

var nodes = [];
var edges = [];
var network = null;

function done() {
    setTimeout( function() {
        load();
        draw();
        done();
    }, 10000);
}

load();

function load(){
    var xmlhttp = new XMLHttpRequest();
    var url1 = "script/fetchTweets.php";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this.responseText);
        }
    }
    xmlhttp.open("GET", url1, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var out="";

        for(i,ii=i+1; i < arr.length; i++) {
            console.log('1');
            // addNodes(i,arr[i].screen_name,arr[i].profile_image_url);
            nodes[i]={id: i,  shape: 'circularImage', image: arr[i].profile_image_url, label:arr[i].screen_name};
            nodes[ii]={id: ii,  shape: 'circularImage', image: arr[i].rt_user_image_url, label:arr[i].rt_user};
            edges[i] = {from: i, to: ii};
        }

    }
}//load()



// Called when the Visualization API is loaded.
function draw() {
    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            borderWidth:4,
            size:30,
            color: {
                border: '#406897',
                background: '#6AAFFF'
            },
            font:{color:'#eeeeee'},
            shapeProperties: {
                useBorderWithImage:true
            }
        },
        edges: {
            color: 'lightgray'
        }
    };
    network = new vis.Network(container, data, options);
}
