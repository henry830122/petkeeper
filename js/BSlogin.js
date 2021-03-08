function id(id) {
  return document.getElementById(id);
}

function checkAdmin() {
  id('adminLogin').addEventListener("click",function(){
    var adminIdValue = id('adminIdInput').value;
    var adminPswValue = id('adminPswInput').value;
    //--------------------回後端檢查是否有此管理者
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        if (xhr.responseText == "AccountError"){
          alert ("帳號密碼錯誤，請重新輸入。");
        }else if(xhr.responseText == "suspended"){
          alert("您沒有權限進入後台");
        }else{
          location.href = "./backStage/admin.php";
        }
      } else {
        alert(xhr.status);
      }
    }
    xhr.open("get", `./php/share_BSlanding.php?adminId=${adminIdValue}&adminPsw=${adminPswValue}`, true);
    xhr.send(null);
  });
}

window.addEventListener("load", function () {
  /** 管理員登入 **/
  checkAdmin(); //管理員登入
}, true);