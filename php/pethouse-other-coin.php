<?php
session_start();
$errMsg="";
$coin = $_GET['type'];
$memNo= $_GET['other'];
try{
  require_once("../connectdd103g3.php");

  $sql = "update `member` set coin=:coin where memNo=:memNo";
  $iscoin = $pdo->prepare($sql);
  $iscoin->bindValue(":coin",$coin);
  $iscoin->bindValue(':memNo',$memNo);
  $iscoin->execute();

}catch(PDOException $e){
  $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
  $errMsg .="錯誤行號: ".$e->getLine()."<br>";
}
?>