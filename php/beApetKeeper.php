<?php
header('Content-Type: application/json');
require_once("../connectdd103g3.php");

function saveImg($imgData, $userId)
{
    $targetDir = dirname(__DIR__)."/img/user/";
    if (! file_exists($targetDir)) {
        mkdir($targetDir);
    }
    $imgData = str_replace('data:image/png;base64,', '', $imgData); //將檔案格式的資訊拿掉
    // $img = str_replace(' ', '+', $imgData);
    $data = base64_decode($imgData);
    $fileName = "pet_".$userId.".png";
  
    $targetFile = $targetDir.$fileName;

    if (!file_put_contents($targetFile, $data)) {
        throw new Exception("請重新打造寵物");
    }
  
    return $fileName;
}

//讀取頁面


//取得寵物元件
if ($_SERVER['REQUEST_METHOD'] == "GET" && isset($_GET['petType'])) {

  $sql = "Select elePic FROM petcomponent WHERE eleName LIKE CONCAT(?,'%') AND (eleStatus = '1')";

  try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_GET['petType']]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($data as $key => $arr){
        $data[$key]['elePic'] =  "./backStage/images/".$data[$key]['elePic'];
        }
  } catch (Exception $e) {
      exit();
  }

  echo json_encode($data);
}

//創造寵物
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    session_start();
    $sql = "Select memId FROM `member` WHERE memNo=?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_SESSION['memNo']]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        exit();
    }

    try {
        $picPath = saveImg($_POST["petPic"], $data["memId"]);
    } catch (Exception $e) {
        echo json_encode(
        [
            'error' => [
                'msg' => $e->getMessage()
            ]
        ]
    );
        exit();
    }

    $petType = $_POST["petType"] === "dog" ? 0 : 1;

    //更新會員寵物欄位
    $sql = "UPDATE `member` SET petName=?, petType=?, petPic=?, petColor=?, coin=?, times=?, feedNum=? WHERE memNo=?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST["petName"], $petType, $picPath, $_POST["petColor"], 500, 3, 2, $_SESSION['memNo']]);
    } catch (PDOException $e) {
        exit();
    }

    $data = [
      'petName' => $_POST["petName"],
      'petPic' => "./img/user/".$picPath,
      'petColor' => $_POST["petColor"],
  ];

    echo json_encode($data);
}
?>