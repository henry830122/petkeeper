<?php
  session_start();
  if(isset($_SESSION["memId"]) == true){
    //送回前端資料
    $logInSessionResult = array("memName"=>$_SESSION["memName"],"memId"=>$_SESSION["memId"],"memNick"=>$_SESSION["memNick"],"petName"=>$_SESSION["petName"]);
    echo json_encode($logInSessionResult);
  }else{
    echo "normal";
  };
?>