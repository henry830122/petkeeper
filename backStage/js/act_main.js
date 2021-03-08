// 顯示被選擇出來的圖片
function showSelectPic() {
  $('.FileactPicSrc').change(function(e){
    var file = this.files[0];
    var putActPic = $(this).prev()[0];

    var readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load', function (e) {
      putActPic.src = this.result;
      putActPic.style.maxWidth = "100%";
    });
  });
}// 顯示被選擇出來的圖片End

//改變活動狀態Value值
function checkedActValue(){
  var actStatusCheckbox = document.getElementsByClassName("actStatus");

  //checked-->上架
  for(var i=0; i<actStatusCheckbox.length; i++){
    actStatusCheckbox[i].addEventListener("click",function(e){
      if (this.checked == true) {
        this.value = "0";
      }else{
        this.value = "1";
      }
    });
  } 
}//改變活動狀態Value值End

//修改活動
function changeActMessage(){
  $(".changeActBtn").click(function(e){
    var actType = $(this).parents('.edidAct').find('.actType')[0];
    var actName = $(this).parents('.edidAct').find('.actName')[0];
    var actPic = $(this).parents('.edidAct').find('.actPic')[0];
    var actDate = $(this).parents('.edidAct').find('.actDate')[0];
    var actNum = $(this).parents('.edidAct').find('.actNum')[0];
    var deadline = $(this).parents('.edidAct').find('.deadline')[0];
    var actLoc = $(this).parents('.edidAct').find('.actLoc')[0];
    var mapLong = $(this).parents('.edidAct').find('.mapLong')[0];
    var mapLat = $(this).parents('.edidAct').find('.mapLat')[0];
    var actStatus = $(this).parents('.edidAct').find('.actStatus')[0];
    var actText = $(this).parents('.edidAct').find('.actText')[0];
    if ($(this).text() == "修改活動"){
      /** btn改變 **/
      $(this).removeClass('btn-warning');
      $(this).addClass('btn-success');
      $(this).text('確認修改');
      /* 解開disable */
      actType.removeAttribute('disabled');
      actName.removeAttribute('disabled');
      actPic.removeAttribute('disabled');
      actDate.removeAttribute('disabled');
      actNum.removeAttribute('disabled');
      deadline.removeAttribute('disabled');
      actLoc.removeAttribute('disabled');
      mapLong.removeAttribute('disabled');
      mapLat.removeAttribute('disabled');
      actStatus.removeAttribute('disabled');
      actText.removeAttribute('disabled');
    }else{
      if (actName.value == "") {
        actName.focus();
        actName.placeholder = "請填寫活動名稱";
      } else if (actDate.value == "") {
        actDate.focus();
      } else if (actNum.value == "") {
        actNum.focus();
      } else if (deadline.value == "") {
        deadline.focus();
      } else if (actLoc.value == "") {
        actLoc.focus();
        actLoc.placeholder = "請填寫活動地點";
      } else if (mapLong.value == "") {
        mapLong.focus();
        mapLong.placeholder = "請填寫活動座標經度";
      } else if (mapLat.value == "") {
        mapLat.focus();
        mapLat.placeholder = "請填寫活動座標緯度";
      } else if (actText.value == "") {
        actText.focus();
        actText.placeholder = "請填寫活動內容";
      } else {
        //送資料到後端
        var formData = new FormData($(this).parents('.edidAct')[0]);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            if (xhr.responseText == "Succesfully uploaded") {
              console.log(xhr.responseText);
              window.location.reload();
              alert("活動編輯成功!");
            } else {
              console.log(xhr.responseText);
            }
          } else {
            alert(xhr.status)
          }
        }
        xhr.open('POST', 'php/act_updateAct.php', true);
        xhr.send(formData);
      }
    } 
  });
}//修改活動End

//重新輸入
function cancelActInfo(){
  $("#cancelBtn").click(function(e){
    var actStatus = $(this).parents('#addAct').find('.actStatus')[0];
    actStatus.value = "1"; // 活動狀態
  });
}//重新輸入End

//增加活動
function addAct() {
  $("#addActBtn").click(function (e) {
    var actName = $(this).parents('#addAct').find('.actName')[0];
    var actPic = $(this).parents('#addAct').find('.actPic')[0];
    var actDate = $(this).parents('#addAct').find('.actDate')[0];
    var actNum = $(this).parents('#addAct').find('.actNum')[0];
    var deadline = $(this).parents('#addAct').find('.deadline')[0];
    var actLoc = $(this).parents('#addAct').find('.actLoc')[0];
    var mapLong = $(this).parents('#addAct').find('.mapLong')[0];
    var mapLat = $(this).parents('#addAct').find('.mapLat')[0];
    var actText = $(this).parents('#addAct').find('.actText')[0];

    if (actName.value == ""){
      actName.focus();
      actName.placeholder = "請填寫活動名稱";
    } else if (actPic.value == "") {
      actPic.focus();
    } else if (actDate.value == "") {
      actDate.focus();
    } else if (actNum.value == "") {
      actNum.focus();
    } else if (deadline.value == "") {
      deadline.focus();
    } else if (actLoc.value == "") {
      actLoc.focus();
      actLoc.placeholder = "請填寫活動地點";
    } else if (mapLong.value == "") {
      mapLong.focus();
      mapLong.placeholder = "請填寫活動座標經度";
    } else if (mapLat.value == "") {
      mapLat.focus();
      mapLat.placeholder = "請填寫活動座標緯度";
    } else if (actText.value == "") {
      actText.focus();
      actText.placeholder = "請填寫活動內容";
    }else{
      var formData = new FormData(id('addAct'));

      //送資料到後端--新增一筆活動
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          if (xhr.responseText == "Succesfully uploaded") {
            console.log(xhr.responseText);
            alert("活動新增成功!");
            window.location.reload();
          } else {
            console.log(xhr.responseText);
          }
        } else {
          alert(xhr.status)
        }
      }
      xhr.open('POST', 'php/act_addAct.php', true);
      xhr.send(formData);
    }
  });
} //增加活動End

//顯示所有活動
function getAllActs(){

  function showAllActs(jsonStr){
    var activities = JSON.parse(jsonStr);
    let allActsHTML = `
      <form id="addAct" class="col-12 col-md-6" enctype="multipart/form-data">
        <div class="card">
          <div class="card-header">新增活動</div>
          <div class="card-body">

            <table class="table">
              <tr class="getActType">
                <th>活動類別</th>
                <td>
                  <select class="form-control equipClass actType" name="actType">
                    <option value="分享講座">分享講座</option>
                    <option value="飼養課程">飼養課程</option>
                  </select>
                </td>
              </tr>
              <tr class="getActName">
                <th>活動名稱</th>
                <td><input type="text" name="actName" class="actName"></td>
              </tr>
              <tr class="getActPic">
                <th>活動圖片</th>
                <td>
                  <img src="" class="actPicSrc">
                  <input type="file" class="FileactPicSrc actPic" name="actPic" accept="image/gif,image/jpeg">
                </td>
              </tr>
              <tr class="getActDate">
                <th>活動日期</th>
                <td><input type="date" name="actDate" class="actDate"></td>
              </tr>
              <tr class="getActNum">
                <th>活動人數</th>
                <td><input type="number" name="actNum" class="actNum" min="0" max="100"></td>
              </tr>
              <tr class="getDeadline">
                <th>截止日期</th>
                <td><input type="date" name="deadline" class="deadline"></td>
              </tr>
              <tr class="getActLoc">
                <th>活動地點</th>
                <td><input type="text" name="actLoc" class="actLoc" maxlength="50"></td>
              </tr>
              <tr class="getMapLong">
                <th>經度</th>
                <td><input type="text" name="mapLong" class="mapLong" maxlength="10"></td>
              </tr>
              <tr class="getMapLat">
                <th>緯度</th>
                <td><input type="text" name="mapLat" class="mapLat" maxlength="10"></td>
              </tr>
              <tr class="getActStatus">
                <th>活動狀態</th>
                <td>
                  <label class="switch switch-3d switch-success">
                    <input class="switch-input actStatus" type="checkbox" value="1" name="actStatus">
                    <span class="switch-slider"></span>
                  </label>
                </td>
              </tr>
              <tr class="getActText">
                <th>活動內容</th>
                <td>
                  <textarea class="form-control actText" rows="3" value="" name="actText" maxlength="256"
                    placeholder="請輸入活動內容，不得超過256字"></textarea>
                </td>
              </tr>
            </table>
            <div class="row">
              <div class="col-6">
                <div id="addActBtn" class="btn btn-block btn-warning">確認新增</div>
              </div>
              <div class="col-6">
                <button id="cancelBtn" type="reset" class="btn btn-block btn-secondary">重新輸入</button>
              </div>
            </div>

          </div>
        </div>
      </form>
    `;

    for(var i=0; i<activities.length; i++){
      //是否被checked
      let turn = "";
      if (activities[i].actStatus == 0) {
        turn = "checked";
      } else {
        turn = "";
      }

      allActsHTML += `
        <form class="col-12 col-md-6 edidAct" enctype="multipart/form-data">
          <div class="card">
            <div class="card-header">活動編號${activities[i].actNo}</div>
            <div class="card-body">
              <table class="table getActTable">
                <input type="hidden" name="actNo" value="${activities[i].actNo}">
                <tr class="getActType">
                  <th>活動類別</th>
                  <td>
                    <select class="form-control equipClass actType" name="actType" disabled>
                      <option value="分享講座" ${activities[i].actType == "分享講座" ? "selected":""}>分享講座</option>
                      <option value="飼養課程" ${activities[i].actType == "飼養課程" ? "selected":""}>飼養課程</option>
                    </select>
                  </td>
                </tr>
                <tr class="getActName">
                  <th>活動名稱</th>
                  <td><input type="text" name="actName" class="actName" value="${activities[i].actName}" disabled></td>
                </tr>
                <tr class="getActPic">
                  <th>活動圖片</th>
                  <td>
                    <img class="actPicSrc" src="./images/${activities[i].actPic}">
                    <input type="file" name="actPic" class="FileactPicSrc actPic" accept="image/gif,image/jpeg" disabled>
                  </td>
                </tr>
                <tr class="getActDate">
                  <th>活動日期</th>
                  <td><input type="date" name="actDate" class="actDate" value="${activities[i].actDate}" disabled></td>
                </tr>
                <tr class="getActNum">
                  <th>活動人數</th>
                  <td><input type="number" name="actNum" class="actNum" min="0" max="100" value="${activities[i].actNum}" disabled></td>
                </tr>
                <tr class="getParNum">
                  <th>報名人數</th>
                  <td class="parNum">${activities[i].parNum}</td>
                </tr>
                <tr class="getDeadline">
                  <th>截止日期</th>
                  <td><input type="date" name="deadline" class="deadline" value="${activities[i].deadline}" disabled></td>
                </tr>
                <tr class="getActLoc">
                  <th>活動地點</th>
                  <td><input type="text" name="actLoc" class="actLoc" maxlength="50" value="${activities[i].actLoc}" disabled></td>
                </tr>
                <tr class="getMapLong">
                  <th>經度</th>
                  <td><input type="text" name="mapLong" class="mapLong"  maxlength="10" value="${activities[i].mapLong}" disabled></td>
                </tr>
                <tr class="getMapLat">
                  <th>緯度</th>
                  <td><input type="text" name="mapLat" class="mapLat"  maxlength="10" value="${activities[i].mapLat}" disabled></td>
                </tr>
                <tr class="getActStatus">
                  <th>活動狀態</th>
                  <td>
                    <label class="switch switch-3d switch-success">
                      <input class="switch-input actStatus" type="checkbox" ${turn} value="${activities[i].actStatus}" name="actStatus" disabled>
                      <span class="switch-slider"></span>
                    </label>
                  </td>
                </tr>
                <tr class="getActText">
                  <th>活動內容</th>
                  <td>
                    <textarea class="form-control actText" rows="3" value="" name="actText" maxlength="256" disabled>${activities[i].actText}</textarea>
                  </td>
                </tr>
              </table>
              <div class="row">
                <div class="col-12">
                  <div class="btn btn-block btn-warning changeActBtn">修改活動</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      `;

      id('putActCard').innerHTML = allActsHTML;

      showSelectPic();//顯示圖片
      checkedActValue();//改變活動狀態Value值
      changeActMessage();//修改活動
      cancelActInfo();//重新輸入
      addAct();//確認新增活動
    }

    console.log(activities.length);
  }

  //送資料到後端撈所有活動
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      showAllActs(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  }

  xhr.open('get', 'php/act_showAct.php', true);
  xhr.send(null);
} //顯示所有活動End

// init
function init() {
  getAllActs(); //顯示所有活動
}
window.addEventListener("load", init, false);
// initEnd