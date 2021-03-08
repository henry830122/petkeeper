<?php
  try{
    require_once("../connectdd103g3.php");

    $sql = "SELECT memName, petName, coin, petPic ,petColor FROM `member` order by coin desc limit 0, 3";
    $ranking = $pdo->query($sql);
    $rankingRows = $ranking->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rankingRows);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?> 