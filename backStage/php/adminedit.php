  <?php
    require_once('../../connectdd103g3.php');
    $sql="update `administrator` set adminId = :adminId , adminPsw = :adminPsw where adminNo = :adminNo";
    $admin = $pdo->prepare($sql);
    
    $admin->bindValue(":adminId", $_GET["adminId"]);
    $admin->bindValue(":adminPsw", $_GET["adminPsw"]);
    $admin->bindValue(":adminNo", $_GET["adminNo"]);
    $admin->execute();
    header("location:../admin.php");
  ?>