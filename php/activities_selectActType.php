<?php
  $errMsg="";
  $actType = $_GET["actType"];
  try{
    require_once("../connectdd103g3.php");
    if($actType == "全部活動"){
      $sql = "select * from activity where actStatus != 1 order by actDate desc";
		  $activities = $pdo->query($sql);
    }else{
      $sql = "select * from activity where actType = :actType and actStatus != 1 order by actDate desc";
      $activities = $pdo->prepare($sql);
      $activities->bindValue(":actType",$actType);
      $activities->execute();
    }
    $arr=[];

    while($activityRow=$activities->fetch(PDO::FETCH_ASSOC)){
      array_push($arr,$activityRow);
    };
    echo json_encode($arr);//轉成JSON字串

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>