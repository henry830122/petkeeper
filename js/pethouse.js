$(document).ready(function () {
    
    $.ajax({
        url: "./php/pethouse-member.php",

        datType: "json",

        type: "GET",

        success: function (data) {
            // console.log(data);


            let result = JSON.parse(data);
            $("#ph-coin-1").text(result[0].coin);            
            $("#ph-memId-1").text(result[0].memNick);
            $("#ph-memName-1").text(result[0].petName);
            
            
            $("#ph-feedNum-1").text(result[0].feedNum);
            $("#ph-feedNum-2").text(result[0].feedNum);
            $("#ph-feedNum-3").text(result[0].feedNum);
            
            $("#ph-times-1").text(result[0].times);
            $("#ph-times-2").text(result[0].times);
            $("#ph-times-3").text(result[0].times);
 
            $("#pet-style-1").attr("src",`img/user/${result[0].petPic}`);
            $("#pet-style-2").attr("src",`img/user/${result[0].petPic}`);
            $("#pet-style-3").attr("src",`img/user/${result[0].petPic}`);

            $("#pet-color-1").css('filter',`hue-rotate(  ${result[0].petColor}deg)`);
            $("#pet-color-2").css('filter',`hue-rotate(  ${result[0].petColor}deg)`);
            $("#pet-color-3").css('filter',`hue-rotate(  ${result[0].petColor}deg)`);

            if (result[0].petType == 0) {
                $(".ph-st-full").attr("src", "img/ph-shitBu-full.png");
                $(".ph-st-before").attr("src", "img/ph-shitBu-full.png");
                $(".ph-st-after").attr("src", "img/ph-shitBu.png");
                $(".ph-st-no").attr("src", "img/ph-shitBu.png");
                $(".bg-li-shitBox").css("display", "none");
                
            }else{
                $(".ph-st-full").attr("src", "img/shitbox-full.png");
                $(".ph-st-before").attr("src", "img/shitbox-full.png");
                $(".ph-st-after").attr("src", "img/shitbox.png");
                $(".ph-st-no").attr("src", "img/shitbox.png");
                $(".bg-li-shitBu").css("display", "none");
                
            };
        }
    });
    $.ajax({
        url: "./php/pethouse-activity.php",

        datType: "json",

        type: "GET",

        success: function (data) {
            // console.log(data);


            let result = JSON.parse(data);
            $("#ph-act-date-1").text(result[0].actDate);
            $("#ph-act-date-2").text(result[1].actDate);
            $("#ph-act-date-3").text(result[2].actDate);
            $("#ph-act-date-4").text(result[0].actDate);
            $("#ph-act-date-5").text(result[1].actDate);
            $("#ph-act-date-6").text(result[2].actDate);
            $("#ph-act-date-7").text(result[0].actDate);
            $("#ph-act-date-8").text(result[1].actDate);
            $("#ph-act-date-9").text(result[2].actDate);
            $("#ph-act-date-10").text(result[0].actDate);
            $("#ph-act-date-11").text(result[1].actDate);
            $("#ph-act-date-12").text(result[2].actDate);
            
            $("#ph-act-text-1").text(result[0].actName);
            $("#ph-act-text-2").text(result[1].actName);
            $("#ph-act-text-3").text(result[2].actName);
            $("#ph-act-text-4").text(result[0].actName);
            $("#ph-act-text-5").text(result[1].actName);
            $("#ph-act-text-6").text(result[2].actName);
            $("#ph-act-text-7").text(result[0].actName);
            $("#ph-act-text-8").text(result[1].actName);
            $("#ph-act-text-9").text(result[2].actName);
            $("#ph-act-text-10").text(result[0].actName);
            $("#ph-act-text-11").text(result[1].actName);
            $("#ph-act-text-12").text(result[2].actName);
            
            $("#ph-act-type-1").text(result[0].actType);
            $("#ph-act-type-2").text(result[1].actType);
            $("#ph-act-type-3").text(result[2].actType);
            $("#ph-act-type-4").text(result[0].actType);
            $("#ph-act-type-5").text(result[1].actType);
            $("#ph-act-type-6").text(result[2].actType);
            $("#ph-act-type-7").text(result[0].actType);
            $("#ph-act-type-8").text(result[1].actType);
            $("#ph-act-type-9").text(result[2].actType);
            $("#ph-act-type-10").text(result[0].actType);
            $("#ph-act-type-11").text(result[1].actType);
            $("#ph-act-type-12").text(result[2].actType);
        }
    });
     $.ajax({
         url: "./php/pethouse-bagpack-item.php",

         datType: "json",

         type: "GET",

         success: function (data) {
             // console.log(data);
             let result = JSON.parse(data);
             $("#ph-bg-fe-1").text(result[0].prodName);
             $("#ph-bg-fe-2").text(result[0].prodName);
             $("#ph-bg-fe-3").text(result[0].prodName);
             $("#ph-bg-eve-1").text(result[1].prodName);
             $("#ph-bg-eve-2").text(result[1].prodName);
             $("#ph-bg-eve-3").text(result[1].prodName);            
             $("#ph-bg-sb-1").text(result[3].prodName);
             $("#ph-bg-sb-2").text(result[3].prodName);
             $("#ph-bg-sb-3").text(result[3].prodName);
             $("#ph-bg-cb-1").text(result[2].prodName);
             $("#ph-bg-cb-2").text(result[2].prodName);
             $("#ph-bg-cb-3").text(result[2].prodName);
             $("#ph-bg-sp-1").text(result[4].prodName);
             $("#ph-bg-sp-2").text(result[4].prodName);
             $("#ph-bg-sp-3").text(result[4].prodName);


         }
     });
    $.ajax({
        url: "./php/pethouse-backpack.php",

        datType: "json",

        type: "GET",

        success: function (data) {
            // console.log(data);


            let result = JSON.parse(data);
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                if (result[i].prodNo == 2) {
                    $(".bg-li-eve").css("display", "block");
                    $(".bg-li-eve").css("order", "0");
                    console.log("有買二");
                    if (result[i].useStatus == 1) {
                        $(".ph-clothes").css("display", "block");
                        $('.bg-li-eve').addClass('bg-used');
                    }else{
                        $(".ph-clothes").css("display", "none");
                        $('.bg-li-eve').removeClass('bg-used');
                    }
                }
                if (result[i].prodNo == 3) {
                    $(".bg-li-foodBox").css("display", "block");
                    $(".bg-li-foodBox").css("order", "0");
                    console.log("有買三");
                    if (result[i].useStatus == 1) {
                        $(".ph-fd-no").attr("src", "img/shop-foodBowl.png");
                        $(".ph-fd-before").attr("src", "img/shop-foodBowl.png");
                        $(".ph-fd-after").attr("src", "img/ph-fdbox-1.png");
                        $('.bg-li-foodBox').addClass('bg-used');
                    } else {
                        $(".ph-fd-no").attr("src", "img/foodbox.png");
                        $(".ph-fd-before").attr("src", "img/foodbox.png");
                        $(".ph-fd-after").attr("src", "img/foodbox-full.png");
                        $('.bg-li-foodBox').removeClass('bg-used'); 
                    }
                }
                if (result[i].prodNo == 4) {
                    $(".bg-li-shitBox").css("display", "block");
                    $(".bg-li-shitBox").css("order", "0");
                    console.log("有買四");
                    if (result[i].useStatus == 1) {
                        $(".ph-st-full").attr("src", "img/shitBox-h-full.png");
                        $(".ph-st-before").attr("src", "img/shitBox-h-full.png");
                        $(".ph-st-after").attr("src", "img/shop-catLitter.png");
                        $(".ph-st-no").attr("src", "img/shop-catLitter.png");
                        $('.bg-li-shitBox').addClass('bg-used');
                    } else {
                        $(".ph-st-full").attr("src", "img/shitbox-full.png");
                        $(".ph-st-before").attr("src", "img/shitbox-full.png");
                        $(".ph-st-after").attr("src", "img/shitbox.png");
                        $(".ph-st-no").attr("src", "img/shitbox.png");
                        $('.bg-li-shitBox').removeClass('bg-used'); 
                    }
                }
                if (result[i].prodNo == 5) {
                    $(".bg-li-shitBu").css("display", "block");
                    $(".bg-li-shitBu").css("order", "0");
                    console.log("有買五");
                    if (result[i].useStatus == 1) {
                        $(".ph-st-full").attr("src", "img/ph-shitBu-h.png");
                        $(".ph-st-before").attr("src", "img/ph-shitBu-h.png");
                        $(".ph-st-after").attr("src", "img/ph-diaper-1.png");
                        $(".ph-st-no").attr("src", "img/ph-diaper-1.png");
                        $('.bg-li-shitBu').addClass('bg-used');
                    } else {
                        $(".ph-st-full").attr("src", "img/ph-shitBu-full.png");
                        $(".ph-st-before").attr("src", "img/ph-shitBu-full.png");
                        $(".ph-st-after").attr("src", "img/ph-shitBu.png");
                        $(".ph-st-no").attr("src", "img/ph-shitBu.png");
                        $('.bg-li-shitBu').removeClass('bg-used'); 
                    }
                }
            };
        }
    });

    $(".ph-hs-btn").click(function () {
        $(".ph-fd-sw").css("display", "none");
        $(".ph-hs-sw").css("display", "block");
        $(".ph-pu-sw").css("display", "none");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-safe-tip").css("display", "block");
        $(".ph-oh-safe").css("display", "block");
        $(".ph-other-lightbox").css("display", "none");
        $(".ph-mem-box-1").css("display", "block");
    });
    $(".ph-fe-btn").click(function () {
        $(".ph-fd-sw").css("display", "block");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "none");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-fd").removeClass("ph-fd-ani");
        $(".ph-coin-plus").removeClass("coin-ani");
        $(".ph-coin-num").removeClass("coin-num-ani");
        $(".ph-fd-after").css("display", "none");
        $(".ph-fd-before").css("display", "block");
        $(".ph-fd-full").css("display", "none");
    });
    $(".ph-sv-btn").click(function () {
        $(".ph-fd-sw").css("display", "none");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "block");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-st-before").css("display", "block");
        $(".ph-st-after").css("display", "none");
        $(".ph-coin-plus").removeClass("coin-ani");
        $(".ph-coin-num").removeClass("coin-num-ani");
        $(".ph-st").removeClass("ph-fd-ani");
    });
    $(".ph-fd-no").click(function () {
        $(".ph-fd-sw").css("display", "block");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "none");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-fd").removeClass("ph-fd-ani");
        $(".ph-coin-plus").removeClass("coin-ani");
        $(".ph-coin-num").removeClass("coin-num-ani");
        $(".ph-fd-after").css("display", "none");
        $(".ph-fd-before").css("display", "block");
        $(".ph-fd-full").css("display", "none");
    });
    $(".bg-li-feed").click(function () {
        $(".ph-fd-sw").css("display", "block");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "none");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-fd").removeClass("ph-fd-ani");
        $(".ph-coin-plus").removeClass("coin-ani");
        $(".ph-coin-num").removeClass("coin-num-ani");
        $(".ph-fd-after").css("display", "none");
        $(".ph-fd-before").css("display", "block");
        $(".ph-fd-full").css("display", "none");
    });    
    $(".ph-fd").click(function () {
        $(".ph-fd-sw").css("display", "block");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "none");
        $(".ph-oh-sw").css("display", "none");
    });
    $(".ph-st-full").click(function () {
        $(".ph-fd-sw").css("display", "none");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "block");
        $(".ph-oh-sw").css("display", "none");
        $(".ph-st-before").css("display", "block");
        $(".ph-st-after").css("display", "none");
        $(".ph-coin-plus").removeClass("coin-ani");
        $(".ph-coin-num").removeClass("coin-num-ani");
        $(".ph-st").removeClass("ph-fd-ani");
    });
    $(".ph-st").click(function () {
        $(".ph-fd-sw").css("display", "none");
        $(".ph-hs-sw").css("display", "none");
        $(".ph-pu-sw").css("display", "block");
        $(".ph-oh-sw").css("display", "none");
    });
    $(".ph-dr").click(function() {
        $(".ph-other-lightbox").css("display", "block");
    });
    $(".ph-sd-oh").click(function () {
        $(".ph-other-lightbox").css("display", "block");
    });
    $(".ph-tip-off").click(function () {
        $(".ph-other-lightbox").css("display", "none");
    });
    $(".ph-tip-on").click(function () {
        
        var now = parseInt($('#ph-times-1').text());
        var minus = parseInt("1");
        if (now>=1) {
            var after = now - minus;
            $('#ph-times-1').text(after);
            $(".ph-mem-box-1").css("display", "none");
            $(".ph-fd-sw").css("display", "none");
            $(".ph-hs-sw").css("display", "none");
            $(".ph-pu-sw").css("display", "none");
            $(".ph-oh-sw").css("display", "block");

            var times = parseInt($('#ph-times-1').text());
            
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-times.php?type=${times}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            });
            var money = parseInt($("#ph-coin-1").text());
            var price = parseInt("100");
            var total = money - price;
            $("#ph-coin-1").text(total);

            var coin = parseInt($("#ph-coin-1").text());
            $.ajax({
                type: "GET",
                url: `./php/pethouse-coin.php?type=${coin}`,
                datatype: "json",
                success: function () {
                    console.log("送出成功");
                }
            });
        }else{
            $(".ph-other-lightbox").css("display", "none");
            $(".ph-tips-lightBox").css("display", "block");
            $(".ph-tips-bgc").removeClass("display-n");
            $(".ph-amount-notEnough").removeClass("display-n");
            $(".ph-feedNum-notEnough").addClass("display-n");
        };
        
        $.ajax({
            url: "./php/pethouse-other-mem.php",

            datType: "json",

            type: "GET",

            success: function (data) {
                console.log(data);
                
                let result = JSON.parse(data);
                $("#ph-other-coin").text(result[0].coin);
                $("#ph-other-memId").text(result[0].memNick);
                $("#ph-other-memName").text(result[0].petName);
                $("#pet-style-4").attr("src",`img/user/${result[0].petPic}`);
                $("#pet-color-4").css('filter', `hue-rotate(  ${result[0].petColor}deg)`);
                sessionStorage["otherNo"]=result[0].memNo;
                console.log(sessionStorage["otherNo"]);
            }
        });
    });    
    
    $(".ph-oh-safe").click(function () {
        $(".ph-qa-box").css("display", "block");
        $(".ph-qa-bgc").css("display", "block");
        var x = Math.floor(Math.random()*10+1);
        if (x>=5) {
            $(".qa-right").css("order", "1");
        }else{
            $(".qa-right").css("order", "0");
        }
        $.ajax({
            url: "./php/pethouse-other-QA.php",

            datType: "json",

            type: "GET",

            success: function (data) {
                console.log(data);


                let result = JSON.parse(data);
                $("#ph-qa-text-1").text(result[0].quesText);
                $("#ph-qa-text-2").text(result[0].quesText);
                $("#ph-qa-text-3").text(result[0].quesText);

                $("#ph-qa-texta-1").text(result[0].ansAText);
                $("#ph-qa-texta-2").text(result[0].ansAText);
                $("#ph-qa-texta-3").text(result[0].ansAText);

                $("#ph-qa-textb-1").text(result[0].ansBText);

                $("#ph-qa-ans-1").text(result[0].rightAns);
                $("#ph-qa-ans-2").text(result[0].rightAns);

            }
        });
    });
    $(".qa-exit").click(function () {
        $(".ph-qa-box").css("display", "none");
        $(".ph-qa-bgc").css("display", "none");
        $(".ph-qa-topic").css("display", "block");
        $(".ph-qa-wrong").css("display", "none");
        $(".ph-qa-right").css("display", "none");
    });
    $(".qa-right").click(function () {
        $(".ph-qa-right").css("display", "flex");
        $(".ph-qa-wrong").css("display", "none");
        $(".ph-qa-topic").css("display", "none");
        $(".ph-safe-tip").css("display", "none");
        $(".ph-oh-safe").css("display", "none");
        var money1 = parseInt($('#ph-coin-1').text());
        var money2 = parseInt($('#ph-other-coin').text());
        var price = parseInt("300");
        var total1 = money1 + price;
        var total2 = money2- price;
            $('#ph-coin-1').text(total1);
            $('#ph-other-coin').text(total2);

        var coin = parseInt($('#ph-coin-1').text());
        $.ajax({
            type: 'GET',
            url: `./php/pethouse-coin.php?type=${coin}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
            },
        })

        sessionStorage["other"] = parseInt($('#ph-other-coin').text());
        console.log("other");
        $.ajax({
            type: 'GET',
            url: `./php/pethouse-other-coin.php?type=${sessionStorage["other"]} & other=${sessionStorage["otherNo"]}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
            },
        })

    });
    $(".qa-wrong").click(function () {
        $(".ph-qa-wrong").css("display", "flex");
        $(".ph-qa-right").css("display", "none");
        $(".ph-qa-topic").css("display", "none");
        $(".ph-safe-tip").css("display", "none");
        $(".ph-oh-safe").css("display", "none");
    });
    
    $(".ph-fd-before").click(function () {
        var amount = parseInt($("#ph-feedNum-1").text());
        if (amount >= 1) {
            $(".ph-fd-before").css("display", "none");
            $(".ph-fd").addClass("ph-fd-ani");
            $(".ph-coin-plus").addClass("coin-ani");
            $(".ph-coin-num").addClass("coin-num-ani");
            $(".ph-fd-after").css("display", "block");
            $(".ph-fd-no").css("display", "none");
            $(".ph-hg").css("display", "none");

            var money = parseInt($("#ph-coin-1").text());
            var price = parseInt("250");
            var total = money + price;
            $("#ph-coin-1").text(total);
            $("#ph-coin-2").text(total);
            $("#ph-coin-3").text(total);

            var coin = parseInt($("#ph-coin-1").text());
            $.ajax({
              type: "GET",
              url: `./php/pethouse-coin.php?type=${coin}`,
              datatype: "json",
              success: function() {
                console.log("送出成功");
              }
            });

            var num = parseInt("1");
            var feedNum = amount - num;
            $("#ph-feedNum-1").text(feedNum);
            $("#ph-feedNum-2").text(feedNum);
            $("#ph-feedNum-3").text(feedNum);
            $.ajax({
              type: "GET",
              url: `./php/pethouse-feedNum.php?type=${feedNum}`,
              datatype: "json",
              success: function() {
                console.log("送出成功");
              }
            });

            setTimeout(function() {
              $(".ph-fd").removeClass("ph-fd-ani");
              $(".ph-coin-plus").removeClass("coin-ani");
              $(".ph-coin-num").removeClass("coin-num-ani");
              $(".ph-fd-after").css("display", "none");
              $(".ph-fd-before").css("display", "block");
              $(".ph-fd-no").css("display", "block");
              $(".ph-hg").css("display", "block");
            }, 6000);
        } else {
            $(".ph-tips-lightBox").css("display", "block");
            $(".ph-tips-bgc").removeClass("display-n");
            $(".ph-feedNum-notEnough").removeClass("display-n");
            $(".ph-amount-notEnough").addClass("display-n");
        };
        
    });
    $(".ph-tips-exit").click(function () {
        $(".ph-tips-lightBox").css("display", "none");
        $(".ph-tips-bgc").addClass("display-n");
        $(".ph-feedNum-notEnough").addClass("display-n");
        $(".ph-amount-notEnough").addClass("display-n");
    });
    $(".ph-st-before").click(function () {
        $(".ph-st").addClass("ph-fd-ani");
        $(".ph-coin-plus").addClass("coin-ani");
        $(".ph-coin-num").addClass("coin-num-ani");
        $(".ph-st-before").css("display", "none");
        $(".ph-st-after").css("display", "block");
        $(".ph-st-full").css("display", "none");
        $(".ph-st-no").css("display", "block");
        
        var money = parseInt($('#ph-coin-1').text());
        var price = parseInt("500");
        var total = money + price;
        $('#ph-coin-1').text(total);
        
        var coin1 = parseInt($('#ph-coin-1').text());
        $.ajax({
            type: 'GET',
            url: `./php/pethouse-coin.php?type=${coin1}`,
            datatype: 'json',
            success: function () {
                console.log('送出成功');
            },
        })

        setTimeout(function(){ 
            $(".ph-st").removeClass("ph-fd-ani");
            $(".ph-coin-plus").removeClass("coin-ani");
            $(".ph-coin-num").removeClass("coin-num-ani");
            $(".ph-st-before").css("display", "block");
            $(".ph-st-after").css("display", "none"); 
            $(".ph-st-full").css("display", "block");
            $(".ph-st-no").css("display", "none");
        },6000); 
    });
    setTimeout(function () {
        $("#pet-click").click(function () {        
        $("#pet-click").addClass("ph-click-run");
        $(".ph-hg").css("display", "none");
            setTimeout(function(){ 
                $('#pet-click').removeClass('ph-click-run');
                $(".ph-hg").css("display", "block");
            }, 5000);
        });
    }, 10000);
    $(".bg-exit").click(function () {
        $(".bg-all-lightbox").css("display", "none");
        $(".bg-eve-on").addClass("display-n");
        $(".bg-eve-off").addClass("display-n");
        $(".bg-foodBox-on").addClass("display-n");
        $(".bg-foodBox-off").addClass("display-n");
        $(".bg-shitBox-on").addClass("display-n");
        $(".bg-shitBox-off").addClass("display-n");
        $(".bg-shitBu-on").addClass("display-n");
        $(".bg-shitBu-off").addClass("display-n");
    });

    $(".bg-li-eve").click(function () {
        $(".bg-all-lightbox").css("display", "block");
        $(".bg-eve-on").removeClass("display-n");
        $(".bg-eve-off").removeClass("display-n");
        $(".bg-foodBox-on").addClass("display-n");
        $(".bg-foodBox-off").addClass("display-n");
        $(".bg-shitBox-on").addClass("display-n");
        $(".bg-shitBox-off").addClass("display-n");
        $(".bg-shitBu-on").addClass("display-n");
        $(".bg-shitBu-off").addClass("display-n"); 

        $(".bg-eve-off").click(function () {
            $(".ph-clothes").css("display", "none");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-eve').removeClass('bg-used'); 
            var status = 0;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-2.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });

        $(".bg-eve-on").click(function () {
            $(".ph-clothes").css("display", "block");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-eve').addClass('bg-used');
            var status = 1;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-2.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });
    });   

    $(".bg-li-foodBox").click(function () {
        $(".bg-all-lightbox").css("display", "block");
        $(".bg-eve-on").addClass("display-n");
        $(".bg-eve-off").addClass("display-n");
        $(".bg-foodBox-on").removeClass("display-n");
        $(".bg-foodBox-off").removeClass("display-n");
        $(".bg-shitBox-on").addClass("display-n");
        $(".bg-shitBox-off").addClass("display-n");
        $(".bg-shitBu-on").addClass("display-n");
        $(".bg-shitBu-off").addClass("display-n");
         

        $(".bg-foodBox-off").click(function () {
            $(".ph-fd-no").attr("src","img/foodbox.png");
            $(".ph-fd-before").attr("src","img/foodbox.png");
            $(".ph-fd-after").attr("src","img/foodbox-full.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-foodBox').removeClass('bg-used'); 
            var status = 0;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-3.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });

        $(".bg-foodBox-on").click(function () {
            $(".ph-fd-no").attr("src","img/shop-foodBowl.png");
            $(".ph-fd-before").attr("src","img/shop-foodBowl.png");
            $(".ph-fd-after").attr("src","img/ph-fdbox-1.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-foodBox').addClass('bg-used');
            var status = 1;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-3.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });
    });

    $(".bg-li-shitBox").click(function () {
        $(".bg-all-lightbox").css("display", "block");
        $(".bg-eve-on").addClass("display-n");
        $(".bg-eve-off").addClass("display-n");
        $(".bg-foodBox-on").addClass("display-n");
        $(".bg-foodBox-off").addClass("display-n");
        $(".bg-shitBox-on").removeClass("display-n");
        $(".bg-shitBox-off").removeClass("display-n");
        $(".bg-shitBu-on").addClass("display-n");
        $(".bg-shitBu-off").addClass("display-n");

        $(".bg-shitBox-off").click(function () {
            $(".ph-st-full").attr("src","img/shitbox-full.png");
            $(".ph-st-before").attr("src","img/shitbox-full.png");
            $(".ph-st-after").attr("src","img/shitbox.png");
            $(".ph-st-no").attr("src","img/shitbox.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-shitBox').removeClass('bg-used'); 
            var status = 0;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-4.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });

        $(".bg-shitBox-on").click(function () {
            $(".ph-st-full").attr("src","img/shitBox-h-full.png");
            $(".ph-st-before").attr("src","img/shitBox-h-full.png");
            $(".ph-st-after").attr("src","img/shop-catLitter.png");
            $(".ph-st-no").attr("src","img/shop-catLitter.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-shitBox').addClass('bg-used');
            var status = 1;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-4.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });
    });
    $(".bg-li-shitBu").click(function () {
        $(".bg-all-lightbox").css("display", "block");
        $(".bg-eve-on").addClass("display-n");
        $(".bg-eve-off").addClass("display-n");
        $(".bg-foodBox-on").addClass("display-n");
        $(".bg-foodBox-off").addClass("display-n");
        $(".bg-shitBox-on").addClass("display-n");
        $(".bg-shitBox-off").addClass("display-n");
        $(".bg-shitBu-on").removeClass("display-n");
        $(".bg-shitBu-off").removeClass("display-n"); 

        $(".bg-shitBu-off").click(function () {
            $(".ph-st-full").attr("src","img/ph-shitBu-full.png");
            $(".ph-st-before").attr("src","img/ph-shitBu-full.png");
            $(".ph-st-after").attr("src","img/ph-shitBu.png");
            $(".ph-st-no").attr("src","img/ph-shitBu.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-shitBu').removeClass('bg-used'); 
            var status = 0;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-5.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });

        $(".bg-shitBu-on").click(function () {
            $(".ph-st-full").attr("src","img/ph-shitBu-h.png");
            $(".ph-st-before").attr("src","img/ph-shitBu-h.png");
            $(".ph-st-after").attr("src","img/ph-diaper-1.png");
            $(".ph-st-no").attr("src","img/ph-diaper-1.png");
            $(".bg-all-lightbox").css("display", "none");
            $('.bg-li-shitBu').addClass('bg-used');
            var status = 1;
            $.ajax({
                type: 'GET',
                url: `./php/pethouse-bagpack-useStatus-5.php?type=${status}`,
                datatype: 'json',
                success: function () {
                    console.log('送出成功');
                },
            })
        });
    });
    

});