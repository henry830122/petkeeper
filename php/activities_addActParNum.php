<?php
  session_start();
  $errMsg="";
  $actNo = $_SESSION['actNo'];

  try{
    require_once("../connectdd103g3.php");

    $sql = "update activity set parNum=parNum+1 where actNo=:actNo";
    $isAct = $pdo->prepare($sql);
    $isAct->bindValue(":actNo",$actNo);
    $isAct->execute();

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>