<?php
session_start();
$errMsg="";
$useStatus = $_GET['type'];
$memNo=$_SESSION['memNo'];
try{
  require_once("../connectdd103g3.php");

  $sql = "update backpack set useStatus=:useStatus where memNo=:memNo and prodNo = 5";
  $isuseStatus = $pdo->prepare($sql);
  $isuseStatus->bindValue(":useStatus",$useStatus);
  $isuseStatus->bindValue(':memNo',$memNo);
  $isuseStatus->execute();

}catch(PDOException $e){
  $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
  $errMsg .="錯誤行號: ".$e->getLine()."<br>";
}
?>