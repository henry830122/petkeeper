<?php
session_start();
$errMsg="";
$times = $_GET['type'];
$memNo=$_SESSION['memNo'];
try{
  require_once("../connectdd103g3.php");

  $sql = "update `member` set times=:times where memNo=:memNo";
  $istimes = $pdo->prepare($sql);
  $istimes->bindValue(":times",$times);
  $istimes->bindValue(':memNo',$memNo);
  $istimes->execute();

}catch(PDOException $e){
  $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
  $errMsg .="錯誤行號: ".$e->getLine()."<br>";
}
?>