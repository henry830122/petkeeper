<?php
header('Content-Type: application/json');
require_once("../../connectdd103g3.php");

//查詢欄位
function loadComponents($pdo)
{
    $sql = "Select * FROM petcomponent WHERE 1";
    
    try {
        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($data as $key => $arr){
            $data[$key]['elePic'] =  "./images/".$data[$key]['elePic'];
        }

        return $data;
    } catch (Exception $e) {
        exit();
    }
}
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $data = loadComponents($pdo);
    echo json_encode($data);
}

function uploadImage()
{
    try {
        if(isset($_FILES["img"])){
            include_once("./uploadImg.php");
        }else{
            throw new Exception("請選取圖片");
        }

        return $_FILES["img"]["name"];
    } catch (Exception $e) {
        echo json_encode([
                'error' => [
                    'msg' => $e->getMessage()
                ]
            ]
        );
        exit();
    }
}

//修改欄位
if($_SERVER['REQUEST_METHOD'] == "POST" && count($_POST)!==1 && isset($_POST["pet-no"])){
    $_POST["pet-status"] = isset($_POST["pet-status"])? '1':'0';

    if(isset($_FILES["img"])){
        $imgTragetPath =uploadImage();
        
        $sql = "UPDATE petcomponent SET eleType=?, eleName=?, eleStatus=?, elePic=? WHERE eleNo=?"; 
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_POST["pet-type"], $_POST["pet-name"], $_POST["pet-status"], $imgTragetPath, $_POST["pet-no"]]);
        } catch (Exception $e) {
            exit();
        }

        echo json_encode("success");
    }else{
        $sql = "UPDATE petcomponent SET eleType=?, eleName=?, eleStatus=? WHERE eleNo=?"; 
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_POST["pet-type"], $_POST["pet-name"], $_POST["pet-status"], $_POST["pet-no"]]);
        } catch (Exception $e) {
            exit();
        }

        echo json_encode("success");
    }
}

//新增欄位
if($_SERVER['REQUEST_METHOD'] == "POST" && !isset($_POST["pet-no"])){
    if(empty($_POST["pet-name"])){
        echo json_encode([
            'error' => [
                'msg' => "請輸入名稱"
            ]
        ]);
        exit();
    }

    $imgTragetPath =uploadImage();
  
    $sql = "INSERT petcomponent (eleType, eleName, eleStatus, elePic) VALUES (?, ?, ?, ?)"; 
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST["pet-type"], $_POST["pet-name"], 0, $imgTragetPath]);
    } catch (Exception $e) {
        exit();
    }
    
    echo json_encode("success");
}

//刪除欄位
if($_SERVER['REQUEST_METHOD'] == "POST" && count($_POST)===1 && isset($_POST["pet-no"])){
  
    $sql = "DELETE FROM petcomponent WHERE eleNo=?"; 
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST["pet-no"]]);
    } catch (Exception $e) {
        exit();
    }
    
    echo json_encode("success");
}
?>