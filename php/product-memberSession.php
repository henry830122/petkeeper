<?php
  session_start();
  $errMsg="";
  $memNo = $_SESSION['memNo'];
  try{
    require_once("../connectdd103g3.php");
    $sql = "select * from `member` where memNo=:memNo";
    $member = $pdo->prepare($sql);
    $member->bindValue(':memNo',$memNo);
    $member->execute();
    $arr=[];
    while($memberRow=$member->fetch(PDO::FETCH_ASSOC)){
        array_push($arr,$memberRow);
    };
    echo json_encode($arr);
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>