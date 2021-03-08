<?php
  $errMsg="";
  $pageNo = $_GET["pageNo"];
  $actType = $_GET["actType"];
  $showActsNum = 12; //顯示幾筆資料
  $start = ($pageNo-1) * $showActsNum; //每頁每筆資料的初始資料位置
  try{
    require_once("../connectdd103g3.php");
    if($actType == 'allacts'){
      $sql = "select * from activity where actStatus != 1 order by actDate desc limit $start, $showActsNum";
      $activities = $pdo->query($sql);
    }else{
      $sql = "select * from activity where actType = :actType and actStatus != 1 order by actDate desc limit $start, $showActsNum";
      $activities = $pdo->prepare($sql);
      $activities->bindValue(":actType",$actType);
      $activities->execute();
    }
    $arr=[];

    while($activityRow=$activities->fetch(PDO::FETCH_ASSOC)){
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