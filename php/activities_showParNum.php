<?php
  session_start();
  $errMsg="";
  $actNo = $_SESSION['actNo'];
  try{
    require_once("../connectdd103g3.php");

    $sql = "select * from activity where actNo = :actNo";
    $activity = $pdo->prepare($sql);
    $activity->bindValue(":actNo",$actNo);
    $activity->execute();
    $arr=[];

    while($activityRow=$activity->fetch(PDO::FETCH_ASSOC)){
      array_push($arr,$activityRow);
    };
    echo json_encode($arr);//轉成JSON字串

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>