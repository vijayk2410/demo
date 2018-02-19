done1();
function ttable() {
    var xmlhttp = new XMLHttpRequest();
    var url = "script/fetchTweets.php";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var out = "";
        out += "<table border='1'><tr><th colspan='2'>USER NAME</th><th>STATUS</th></tr>";
        var i;
        for (i = 0; i < arr.length; i++) {

            out += "<tr>" +
                "<td><img src='" + arr[i].profile_image_url + "' alt='NO IMAGE AVAILABLE'></td>" +
                "<td>" + arr[i].screen_name + "</td>" +
                "<td>" + arr[i].text + "</td>" +
                // "<td></td>" +
                "</tr>";
            console.log('1');
            // addNodes(i,arr[i].screen_name,arr[i].profile_image_url);

        }
        out += "</table>";
        document.getElementById("ttable").innerHTML = out;
    }
}

function done1() {
    setTimeout( function() {
        ttable();
        done1();
    }, 10000);
}