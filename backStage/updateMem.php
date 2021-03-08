  <?php
    require_once('../connectdd103g3.php');
    $sql="update `member` set status = :status where memNo = :memNo";
    $member = $pdo->prepare($sql);
    $member->bindValue(":status", $_GET["status"]);
    $member->bindValue(":memNo", $_GET["memNo"]);
    $member->execute();
    header("location:member.php");
  ?>