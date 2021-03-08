<?php
  $errMsg="";
  try{
    require_once("../../connectdd103g3.php");
    $sql = "select * from activity";
    $activities = $pdo->query($sql);
    $arr=[];

    while($activityRow=$activities->fetch(PDO::FETCH_ASSOC)){
        array_push($arr,$activityRow);
    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>