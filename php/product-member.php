<?php
  $errMsg="";
  try{
    require_once("../connectdd103g3.php");
    $sql = "select * from `member`";
    $members = $pdo->query($sql);
    $arr=[];

    while($memberRow=$members->fetch(PDO::FETCH_ASSOC)){
      //會員狀態不是停權才放入陣列 status==0
      if($memberRow["status"] == 1){
        array_push($arr,$memberRow);
      }
    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>