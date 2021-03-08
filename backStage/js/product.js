function showAllproduct(jsonStr) {
  var products = JSON.parse(jsonStr);
  let allprodHTML = `<div class="col-lg-6">
    <div class="card">
      <div class="card-header">新增商品</div>
      <div class="card-body">
        <form action="./php/product.php" method="post" enctype="multipart/form-data">
          <table class="table">
            <tr>
              <th>商品類別</th>
              <td>
                <select class="form-control equipClass" name="type">
                  <option value="1">飼料</option>
                  <option value="2">穿戴</option>
                  <option value="3">設備</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>商品名稱</th>
              <td><input id="pName" type="text" name="pName"></td>
            </tr>
            <tr>
              <th>商品圖片</th>
              <td>
                <img src="">
                <input id="pImg" type="file" class="equipSrc" name="upFile">
              </td>
            </tr>
            <tr>
              <th>商品價格</th>
              <td><input id="pPrice" type="text" name="pPrice"></td>
            </tr>
            <tr>
              <th>商品狀態</th>
              <td>
                <label class="switch switch-3d switch-success">
                  <input class="switch-input" type="checkbox" checked id="pStatus" value="0"
                    name="pStatus">
                  <span class="switch-slider"></span>
                </label>
              </td>
            </tr>
            <tr>
              <th>商品說明</th>
              <td>
                <textarea id="pInfo" class="form-control" rows="3" value="" name="pInfo"></textarea>
              </td>
            </tr>
            <td>
              <div>
                <button id="insert" type="submit" style="display: block;" name="submit"
                  class="btn btn-warning mr-1">新增商品</button>
              </div>
            </td>
          </table>
        </form>
      </div>
    </div>
  </div>`;



  let prodCardSection = document.querySelector('.row');
  for (i = 0; i < products.length; i++) {
    // console.log(`<select class="form-control equipClass prodType">
    // <option value="1" ${products[i].prodType == "1" ? "checked":""}>飼料</option>
    // <option value="2" ${products[i].prodType == "2" ? "checked":""}>穿戴</option>
    // <option value="3" ${products[i].prodType == "3" ? "checked":""}>設備</option>
    // </select>`);
    //產生商品卡片
    let turn = "";
    if (products[i].prodStatus == 0) {
      turn = "checked";
    } else {
      turn = "";
    }

    allprodHTML +=
      `<div class="col-lg-6">
                <div class="card">
                  <div class="card-body">
                    <form action="./php/productUpdate.php" method='get' enctype="multipart/form-data">
                      <table class="table">
                        <div class="card-header">商品編號${products[i].prodNo}</div>
                        <input name='prodNo' text="text" type='hidden' value="${products[i].prodNo}">
                        <tr>
                          <th>商品類別</th>
                          <td>
                            <select class="form-control equipClass" name='type'>
                            <option  value="1" ${products[i].prodType == "1" ? "selected":""}>飼料</option>
                            <option value="2" ${products[i].prodType == "2" ? "selected":""}>穿戴</option>
                            <option  value="3" ${products[i].prodType == "3" ? "selected":""}>設備</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th>商品名稱</th>
                          <td><input type="text" name='pname' value='${products[i].prodName}'></td>
                        </tr>
                        <tr>
                          <th>商品圖片</th>
                          <td>
                            <img src="./images/${products[i].prodPic}">
                          </td>
                        </tr>
                        <tr>
                          <th>商品價格</th>
                          <td><input type="text"value='${products[i].price}' name='price'></td>
                        </tr>
                        <tr>
                          <th>商品狀態</th>
                          <td>
                          <label class="switch switch-3d switch-success">
                          <input type="checkbox" class="switch-input" ${turn} onclick="updateProd(${products[i].prodNo}, this.checked)">
                          <span class="switch-slider" data-checked="" data-unchecked=""></span>
                        </label>
                          </td>
                        </tr>
                        <tr>
                          <th>商品說明</th>
                          <td>
                            <textarea class="form-control" rows="3" name="info">${products[i].prodText}
                              </textarea>
                          </td>
                        </tr>
                        <td>
                            <div>
                                <button id="insert" type="submit" style="display: block;" name="submit"
                                class="btn btn-warning mr-1">確定修改</button>
                            </div>
                        </td>
                      </table>
                  </div>
                    </form>
                </div>
              </div>`;
  };

  prodCardSection.innerHTML = allprodHTML;

};

function updateProd(prodNo, prodStatus) {
  prodStatus = prodStatus == false ? 1 : 0;
  // console.log("./php/UpdateProd.php?prodNo=" + prodNo + "&prodStatus=" + prodStatus)
  location.href = "./php/UpdateProd.php?prodNo=" + prodNo + "&prodStatus=" + prodStatus;
}

function update() {

};
//-------------------------------------------
function init() {

  function products() {

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        showAllproduct(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    };

    xhr.open("get", "./php/product-showData.php", true);
    xhr.send(null);

  };
  products();


};
window.addEventListener("load", init, false);