<?php
  session_start();
  $errMsg="";
  $actNo = $_SESSION['actNo'];
  $memNo = $_SESSION['memNo'];

  try{
    require_once("../connectdd103g3.php");

    $sql = "select * from participate where actNo = :actNo and memNo = :memNo";
    $isAct = $pdo->prepare($sql);
    $isAct->bindValue(":actNo",$actNo);
    $isAct->bindValue(":memNo",$memNo);
    $isAct->execute();
    
    if($isAct->rowCount()==0){
      echo 0; //還未參加
    }else{
      echo 1; //已參加
    }

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>