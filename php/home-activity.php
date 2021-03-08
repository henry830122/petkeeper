<?php
  $errMsg="";
  try{
    require_once("../connectdd103g3.php");
    $sql = "select * from activity order by actDate desc";
    $activities = $pdo->query($sql);
    $arr=[];

    while($activityRow=$activities->fetch(PDO::FETCH_ASSOC)){
      //假如parNum == NULL -> 0
      if($activityRow["parNum"] == NULL){
        $activityRow["parNum"] = 0;
      }
      //有上架的活動才放入陣列 actStatus==0
      if($activityRow["actStatus"] == 0){
        array_push($arr,$activityRow);
      }
    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>