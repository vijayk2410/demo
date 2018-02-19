<?php

    //open connection to mysql db
	//require_once './include/DB_Functions.php';
    $connection = mysqli_connect("localhost","vijay","","twitter") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select distinct topic from tweets";
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