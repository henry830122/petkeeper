<?php
  session_start();
  $errMsg="";
  try{
    require_once('../connectdd103g3.php');
    $sql = "select * from `member` where memNo=:memNo";
    $memHavePet = $pdo->prepare($sql);
    $memHavePet->bindValue(":memNo",$_SESSION["memNo"]);
    $memHavePet->execute();

    $memHavePetRow = $memHavePet->fetch(PDO::FETCH_ASSOC);
    if($memHavePetRow["petName"] == NUll){
      echo "0"; //沒寵物
    }else{
      echo "1"; //有寵物
    }
    
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?>