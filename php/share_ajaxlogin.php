<?php
  session_start();
  $errMsg="";
  $memIdValue = $_GET['memId'];
  $memPswValue = $_GET['memPsw'];
  $memArr=[];
  try{
    require_once("../connectdd103g3.php");
    $sql = "select * from `member` where memId=:memId and memPsw=:memPsw";
    $member = $pdo->prepare($sql);
    $member->bindValue(":memId",$memIdValue);
    $member->bindValue(":memPsw",$memPswValue);
    $member->execute();

    if($member->rowCount() == 0){
      echo "AccountError";
    }else{
      $memRow = $member->fetch(PDO::FETCH_ASSOC);
      if($memRow["status"] == 0){
        echo "suspended";
      }else{
        //存進SESSION
        $_SESSION["memNo"] = $memRow["memNo"];
        $_SESSION["memId"] = $memRow["memId"];
        $_SESSION["memPsw"] = $memRow["memPsw"];
        $_SESSION["memName"] = $memRow["memName"];
        $_SESSION["memNick"] = $memRow["memNick"];
        $_SESSION["memTel"] = $memRow["memTel"];
        $_SESSION["sex"] = $memRow["sex"];
        $_SESSION["email"] = $memRow["email"];
        $_SESSION["coin"] = $memRow["coin"];
        $_SESSION["memNo"] = $memRow["memNo"];
        $_SESSION["petName"] = $memRow["petName"];
        $_SESSION["petPic"] = $memRow["petPic"];
        //送回前端資料
        $logInResult = array("memName"=>$memRow["memName"],"memId"=>$memRow["memId"],"memNick"=>$memRow["memNick"],"petName"=>$memRow["petName"]);
        echo json_encode($logInResult);
      }
    }

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>