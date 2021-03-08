
<?php
  session_start();
  $errMsg="";
  $prodNo = $_GET['type'];
  $memNo = $_SESSION['memNo'];

  try{
    require_once("../connectdd103g3.php");

    $sql = "insert into backpack (memNo, prodNo,useStatus,date) value (:memNo, :prodNo,0,:date);";
    $addAct = $pdo->prepare($sql);
    $addAct->bindValue(":memNo",$memNo);
    $addAct->bindValue(":prodNo",$prodNo);
    $addAct->bindValue(":date",date("Y-m-d"));
    $addAct->execute();

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?>