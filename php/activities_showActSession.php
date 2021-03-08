<?php
  session_start();
  echo json_encode($_SESSION['actInfo']);//把session轉成JSON字串
?>