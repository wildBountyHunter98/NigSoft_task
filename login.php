<?php
    include "includes/database.php";

    $postString = file_get_contents("php://input");
    $postArray  = json_decode($postString, true);

    $selectQuery = "select * from users;";
    $execQuery = $connect->prepare($selectQuery);
    $execQuery->execute();

    $users = $execQuery->get_result();

    $userMatch = "false";

    while($user = $users->fetch_assoc()) {
        if($user['user_name'] == $postArray['username'] && $user['password'] == $postArray['password']){
            $userMatch = "true";
            $_SESSION['username'] = $postArray['username'];
            break;
        }
    }
    if($postArray["mode"] == "signin") {
        echo "{\"isValid\":\"". $userMatch ."\"}";
    } elseif($postArray["mode"] == "signup") {
        if($userMatch == "false") {
            $photo = "";
            $insertquery = "insert into users values(?,?,?,?,?);";
            $insertData = $connect->prepare($insertquery);
            $insertData->bind_param("sssss",$postArray['username'], $postArray['phno'], $postArray['gender'], $postArray['address'], $postArray['password']);
            $insertData->execute();
            $insertData->close();
            echo "{\"isValid\":\"true\"}";
        } else {
            echo "{\"isValid\":\"false\"}";
        }
    }
?>