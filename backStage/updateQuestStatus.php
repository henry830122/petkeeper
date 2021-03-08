  <?php
    require_once('../connectdd103g3.php');
    $sql="update `questionandlibrary` set quesStatus = :quesStatus where quesNo = :quesNo";
    $member = $pdo->prepare($sql);
    $member->bindValue(":quesStatus", $_GET["quesStatus"]);
    $member->bindValue(":quesNo", $_GET["quesNo"]);
    $member->execute();
    header("location:question.php");
  ?>