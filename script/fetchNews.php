<?php

    //open connection to mysql db
	//require_once './include/DB_Functions.php';
    $connection = mysqli_connect("localhost","vijay","","news") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select * from news2;"; //select * from news2 order by no desc limit 50
    //SELECT * FROM news2 ORDER BY location DESC LIMIT 20;
    
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
		
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($connection);
?>