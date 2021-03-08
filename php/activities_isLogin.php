<?php
  session_start();
  if(isset($_SESSION["memId"]) == true){
    echo "login";
  }else{
    echo "logout";
  }
?>