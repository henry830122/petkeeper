<?php
session_start();
$errMsg="";
$feedNum = $_GET['type'];
$memNo=$_SESSION['memNo'];
try{
  require_once("../connectdd103g3.php");

  $sql = "update `member` set feedNum=:feedNum where memNo=:memNo";
  $isfeedNum = $pdo->prepare($sql);
  $isfeedNum->bindValue(":feedNum",$feedNum);
  $isfeedNum->bindValue(':memNo',$memNo);
  $isfeedNum->execute();

}catch(PDOException $e){
  $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
  $errMsg .="錯誤行號: ".$e->getLine()."<br>";
}
?>