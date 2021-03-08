<?php
  session_start();
  $errMsg="";
  // $foodNo = $_GET['type'];
  $memNo = $_SESSION['memNo'];

  try{
    require_once("../connectdd103g3.php");

    $sql = "update `member` set feedNum=feedNum + :foodNo where memNo=:memNo";
    $isfood = $pdo->prepare($sql);
    $isfood->bindValue(":foodNo",$_GET['type']);
    $isfood->bindValue(":memNo",$memNo);
    $isfood->execute();
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?>