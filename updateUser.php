<?php
    include "includes/database.php";

    $postString = file_get_contents("php://input");
    $postArray  = json_decode($postString, true);

    $updatequery = "UPDATE users SET phNo=?,gender=?,address=?,password=? where user_name=?;";
    $updateData = $connect->prepare($updatequery);
    $updateData->bind_param("sssss",$postArray['phno'], $postArray['gender'], $postArray['address'], $postArray['password'], $postArray['username']);
    $updateData->execute();
    $updateData->close();

    echo "{\"isValid\":\"true\"}";
?>