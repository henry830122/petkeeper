<?php
  session_start();
  $errMsg="";
  $actNo = $_GET["actNo"];
  try{
    require_once("../connectdd103g3.php");

    $sql = "select * from activity where actNo = :actNo";
    $activities = $pdo->prepare($sql);
    $activities->bindValue(":actNo",$actNo);
    $activities->execute();
    
    $arr=[];

    while($activityRow=$activities->fetch(PDO::FETCH_ASSOC)){
      $_SESSION['actNo'] = $activityRow["actNo"];
      array_push($arr,$activityRow);
    };
    $_SESSION['actInfo'] = $arr;
    //echo json_encode($_SESSION['actInfo']);//轉成JSON字串

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>