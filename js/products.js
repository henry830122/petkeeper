function init() {
    //產生商品卡片 start
    function product() {
        function showAllproduct(jsonStr) {

            var products = JSON.parse(jsonStr);
            let allprodHTML = "";
            let prodCardSection = document.querySelector('.product-cards');
            var petType = sessionStorage['petType'];
            console.log(petType);

            //產生商品卡片
            for (var i = 0; i < products.length; i++) {
                food = products[i].prodType;
                if (food == 1) {
                    allprodHTML += `
            <div class="product-card">
                    <div class="product-img">
                        <img src="./backStage/images/${products[i].prodPic}" alt="">
                    </div>
                    <div class="product-text">
                        <h3>${products[i].prodName}</h3>
                        <p >功能 | ${products[i].prodText}</p>
                        <table id="tab">
                            <tr>
                                <td>
                                    <span class="price">${products[i].price}</span>
                                    <div class="plus-minus"><input class="min" name="" type="button" value="-" />
                                        <input class="text_box" name="" type="text" value="0" />
                                        <input class="add" name="" type="button" value="+" /></div>

                                </td>
                            </tr>
                        </table>
                        <button class="button" data-prodno="${products[i].prodNo}" id='foodBtn'>
                            <label>${products[i].price}</label>
                            <img src="img/shop-dollars.png" alt=" myBtn">
                        </button>
                    </div>
                    </div>
                    <div id="myModal" class="modal">

            <div class="modal-content">
                <span class="close">&times;</span>
                <h4>成功購入!</h4>
                <p> 已扣除<label id="total"></label>愛心幣，現在就到背包看看吧！</p>
            </div>

        </div>
        `;
                } else {

                    allprodHTML += `
        <div class="product-card">
        <div class="product-img">
            <img src="./backStage/images/${products[i].prodPic}" alt="">
        </div>
        <div class="product-text">
            <h3>${products[i].prodName}</h3>
            <p class='push'>功能 | ${products[i].prodText}</p>
            <button  class="getPrice" data-prodno="${products[i].prodNo}">
                <label class="prodPrice">${products[i].price}</label>
                <img src=" img/shop-dollars.png" alt=" myBtn">
            </button>
        </div>
    </div>
        <div id="myModal2" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h4>成功購入!</h4>
                <p> 已扣除<label >${products[i].price}</label>愛心幣，現在就到背包看看吧！</p>
            </div>
            </div>
            <div id="myModal3" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h4>購入失敗!</h4>
                <p> 愛心幣不足!</p>
            </div>
            </div>
            `;
                };
                prodCardSection.innerHTML = allprodHTML;
            };
            //產生商品卡片End
            confirmLogin();
            foodNumUpdate();
            showMembers();

            //購買按鍵事件 愛心幣 開始
            $('.button').click(function () {
                //check money is ok?
                var money = parseInt($('.coin').find('p').text());
                var price = parseInt($(this).find('label').text());
                var total = money - price;
                if (price == "0") {
                    $('#myModal').css('display', 'block');
                    $('#myModal').find('h4').text('購入失敗!');
                    $('#myModal').find('p').text('請選擇購買數量!');
                } else {
                    if (money >= price) {
                        $('#henry').val(total);
                        $('.coin').find('p').text(total);
                        $('#myModal').css('display', 'block');
                        coinUpdate();
                        foodNumUpdate();
                    } else {
                        $('#myModal3').css('display', 'block');
                    };

                };
            });

            $('.getPrice').click(function () {
                var money = parseInt($('.coin').find('p').text());
                var price = parseInt($(this).find('label').text());
                var total = money - price;
                var prodNo = $(this).data('prodno');
                if (money >= price) {
                    $('#henry').val(total);
                    $('.coin').find('p').text(total);
                    var btn = $(this).find('label').text();
                    $('.modal-content label').text(btn);
                    $('#myModal2').css('display', 'block');
                    coinUpdate();
                    //get button reference, btn_parent_parent
                    // backpackInsert(prodNo, btn_parent_parent);
                    var card = $(this).parent().parent();
                    backpackInsert(prodNo, card);
                } else {
                    $('#myModal3').css('display', 'block');
                };
            });
            $('.close').click(function () {
                $('#myModal2').css('display', 'none');
                $('#myModal3').css('display', 'none');
            });


            $('.close').click(function () {
                $('#myModal').css('display', 'none');
                $('#myModa3').css('display', 'none');
            });
            //購買按鍵事件 愛心幣結束 

            //數量加減與總和 開始

            $(".add").click(function () {
                var t = $(this).parent().find('input[class*=text_box]');
                t.val(parseInt(t.val()) + 1)
                setTotal();
                //foodNumUpdate();
            })
            $(".min").click(function () {
                var t = $(this).parent().find('input[class*=text_box]');
                t.val(parseInt(t.val()) - 1)
                if (parseInt(t.val()) < 0) {
                    t.val(0);
                }
                setTotal();
                //foodNumUpdate();
            })

            function setTotal() {
                var s = 0;
                $("#tab td").each(function () {
                    s += parseInt($(this).find('input[class*=text_box]').val()) * parseInt($(this)
                        .find('span[class*=price]').text());
                });
                $(".button label").text(s.toFixed());
                $(".modal-content label").text(s.toFixed());
            }
            setTotal();
            //數量加減與總和 結束


        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showAllproduct(xhr.responseText);
            } else {
                alert(xhr.status);
            }
        }

        xhr.open("get", "./php/product-showdata.php", true);
        xhr.send(null);
    };

    product();







    //會員盒子START
    function showMembers() {
        function showMem(jsonStr) {
            var members = JSON.parse(jsonStr);
            console.log(members);
            let memberHTML = "";
            let memMiddleSection = document.querySelector('.ph-mem-box');
            sessionStorage['petType'] = `${members[0].petType}`;
            //產生BOX裡的資訊END
            memberHTML += `
            <div class="ph-mem-text">
            <p id="">${members[0].memName}</p>
            <p>寵物:<span id="">${members[0].petName}</span></p>
            <img src="img/ph-coin.png" alt="coin">
            <div class="coin">
                <p>${members[0].coin}</p>
                <input type='text' hidden value='' name='henry' id='henry'>
            </div>
            </div>
                  `;

            memMiddleSection.innerHTML = memberHTML;
            //產生BOX裡的資訊END
















        };
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                showMem(xhr.responseText);
            };
        };
        xhr.open("get", "./php/product-memberSession.php", true);
        xhr.send(null);
    };
    //會員盒子END
    //判斷登入狀態，改變購買按鍵START
    function confirmLogin() {
        var signBoxText = document.querySelector('#loginopenbtn').text;
        var signStatus = document.getElementsByClassName('getPrice');
        var memBox = document.querySelector('.ph-mem-box');
        var foodBtn = document.getElementById('foodBtn');


        if (signBoxText == '登入') {
            //未登入時
            for (i = 0; i < signStatus.length; i++) {
                signStatus[i].disabled = true;
                signStatus[i].style.backgroundColor = '#888';
                signStatus[i].style.cursor = 'default';
            };
            memBox.style.display = 'none';

            foodBtn.disabled = true;
            foodBtn.style.backgroundColor = '#888';
            foodBtn.style.cursor = 'default';
        } else {
            memBox.style.display = '';
        };
    };
    //判斷登入狀態，改變購買按鍵END

    //把錢寫入資料庫start
    function coinUpdate() {
        var coin = parseInt($('.coin').find('p').text());
        $.ajax({
            type: 'GET',
            url: `./php/product-coinupdate.php?type=${coin}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
            },
        })
    };
    //把錢寫入資料庫end

    function foodNumUpdate() {
        var foodNum = $('.text_box').val();
        console.log(foodNum);
        $.ajax({
            type: 'GET',
            url: `./php/product-foodNumUpdate.php?type=${foodNum}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
            },
        })
    };

    function backpackInsert(prodNo, card) {

        console.log(prodNo);
        $.ajax({
            type: 'GET',
            url: `./php/product-backpackInsert.php?type=${prodNo}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
                card.remove();
                // document.querySelector(".product-cards").removeChild(card);
                // return true;
            },
        })
    };

};

window.addEventListener("load", init, false);