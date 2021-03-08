<?php
  session_start();
  $errMsg="";
  $adminId = $_GET["adminId"];
  $adminPsw = $_GET["adminPsw"];
  try{
    require_once("../connectdd103g3.php");
    $sql="SELECT * FROM administrator WHERE adminId=:adminId and adminPsw=:adminPsw";
    $isAdmin = $pdo->prepare($sql);
    $isAdmin->bindValue(":adminId",$adminId);
    $isAdmin->bindValue(":adminPsw",$adminPsw);
    $isAdmin->execute();

    if($isAdmin->rowCount() == 0){
      echo "AccountError"; //帳號錯誤
    }else{
      $adminRow=$isAdmin->fetch(PDO::FETCH_ASSOC);
      if($adminRow["adminStatus"] == 1){
        echo "suspended"; //停權
      }else{
        //存進SESSION
        $_SESSION["adminNO"] = $adminRow["adminNo"];
        $_SESSION["adminId"] = $adminRow["adminId"];
        $_SESSION["adminPsw"] = $adminRow["adminPsw"];
        $_SESSION["adminName"] = $adminRow["adminName"];
        echo "1";
      } 
    }
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>