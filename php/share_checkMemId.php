<?php
  $errMsg="";

  try{
    require_once('../connectdd103g3.php');

    if(isset($_GET["resMemId"]) == true){
      /** 檢查帳號 **/
      $sql = "select * from `member` where memId=:memId";
      $checkmemId = $pdo->prepare($sql);
      $checkmemId->bindValue(":memId",$_GET["resMemId"]);
      $checkmemId->execute();

      if($checkmemId->rowCount() != 0){
        echo "0"; //已使用
      }else{
        echo "1"; //未使用
      }

    }else{
      /** 檢查密碼 **/
      $sql = "select * from `member` where memPsw=:memPsw";
      $checkmemId = $pdo->prepare($sql);
      $checkmemId->bindValue(":memPsw",$_GET["resMemPsw"]);
      $checkmemId->execute();

      if($checkmemId->rowCount() != 0){
        echo "0"; //已使用
      }else{
        echo "1"; //未使用
      }
    }

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?>