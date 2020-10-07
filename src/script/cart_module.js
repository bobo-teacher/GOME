define(["jcookie"], function () {
    return {
        init: function () {
            //通过cookie中的存储的sid和数量对购物车列表进行渲染
            let $sidarr = [];
            let $numarr = [];
            const $goodsitem = $(".cart_li");
            const $itemlist = $(".cart_list>ul");
            function getcookie() {
                if ($.cookie("datasid") && $.get("datanum")) {
                    $sidarr = $.cookie("datasid").split(",");
                    $numarr = $.cookie("datanum").split(",");
                }
            }

            function clonelist(sid, num) {
                $.ajax({
                    url: "http://localhost:8080/fuwuqi/GOME/php/index_everyday_rander.php",
                    dataType: "json",
                }).done(function (data) {
                    for (let value of data) {
                        if (value.sid == sid) {
                            $goodsitem.css({
                                display: "none"
                            })
                            let $cloneitem = $goodsitem.clone(true, true);
                            $cloneitem.find('.goods-pic img').attr("src", value.url);
                            $cloneitem.find('.title a').html(value.title);
                            $cloneitem.find('.price').html(value.price);
                            $cloneitem.find('.quantity input').val(num);
                            $cloneitem.find('.subtotal').html((value.price * num).toFixed(2));
                            $cloneitem.attr("index", value.sid)
                            $itemlist.append($cloneitem);
                            $cloneitem.css({
                                display: "block"
                            })
                        }
                    }
                    calc();
                })
            }

            !function rander() {
                getcookie();
                for (let i = 0; i < $sidarr.length; i++) {
                    clonelist($sidarr[i], $numarr[i]);
                }
            }()

            //全选
            const $allselect = $('.selectall');
            $allselect.click(function () {
                const $inputs = $('.cart-checkbox input');
                $inputs.prop('checked', $(this).prop('checked'));
                $allselect.prop('checked', $(this).prop('checked'));
                calc();
            });
            $itemlist.on("click", "input", function () {
                if ($('input:checked').size() === $('.cart-checkbox input').size() - 1) {
                    $allselect.prop('checked', true);
                } else {
                    $allselect.prop('checked', false);
                }
                calc();
            })

            //数量加减,删除
            $itemlist.on("click", "a", function (e) {
                if (e.target.className === "quantity-add") {
                    let curr = $(e.target).siblings("input").val();
                    $(e.target).siblings("input").val(+curr + 1)
                    let $price = $(e.target).parent().parent().find('.price').html();
                    $(e.target).parent().parent().find('.subtotal').html(($price * (+curr + 1)).toFixed(2));
                    let $datasid = $(e.target).parent().parent().parent().parent().attr("index");
                    console.log($datasid);
                    $numarr.splice($.inArray($datasid, $sidarr), 1, +curr + 1);
                    $.cookie("datanum", $numarr, { expires: 10, path: '/' })
                }
                if (e.target.className === "quantity-down") {
                    let curr = $(e.target).siblings("input").val();
                    if (curr > 0) {
                        $(e.target).siblings("input").val(+curr - 1);
                    } else {
                        $(e.target).siblings("input").val(0);
                        curr = 1;
                    }
                    let $price = $(e.target).parent().parent().find('.price').html();
                    $(e.target).parent().parent().find('.subtotal').html(($price * (+curr - 1)).toFixed(2));
                    let $datasid = $(e.target).parent().parent().parent().parent().attr("index");
                    $numarr.splice($.inArray($datasid, $sidarr), 1, +curr - 1);
                    $.cookie("datanum", $numarr, { expires: 10, path: '/' })
                }
                if (e.target.className === "del") {
                    if(confirm("你确定要删除吗？")){
                        $(e.target).parent().parent().parent().parent().remove();
                        let $datasid = $(e.target).parent().parent().parent().parent().attr("index");
                        $numarr.splice($.inArray($datasid, $sidarr), 1);
                        $sidarr.splice($.inArray($datasid, $sidarr), 1);
                        $.cookie("datanum", $numarr, { expires: 10, path: '/' })
                        $.cookie("datasid", $sidarr, { expires: 10, path: '/' })
                    }
                }
                calc();
            })
            $(".deleteall").on("click",function(){
                if(confirm("你确定要删除选中的商品吗？")){
                    $(".cart_li:visible").each(function (index, element) {
                        if ($(this).find(".cart-checkbox input").is(":checked")) {
                            $(this).remove();
                            let $datasid = $(this).attr("index");
                            $numarr.splice($.inArray($datasid, $sidarr), 1);
                            $sidarr.splice($.inArray($datasid, $sidarr), 1);
                            $.cookie("datanum", $numarr, { expires: 10, path: '/' })
                            $.cookie("datasid", $sidarr, { expires: 10, path: '/' })
                        }
                    })
                }
                calc();
            })

            //计算总价和总件数
            function calc() {
                let $allprice = 0;
                let $allcount = 0;
                $(".cart_li:visible").each(function (index, element) {
                    if ($(this).find(".cart-checkbox input").is(":checked")) {
                        $allprice += parseFloat($(this).find(".subtotal").html());
                        $allcount += parseInt($(this).find(".quantity input").val());
                    }
                })
                $(".totalprice").html("¥" + $allprice.toFixed(2));
                $(".amount-sum span").html($allcount);
            }

            //登陆成功显示用户名，点击退出删除cookie
            const $admin = $("#admin");
            const $login = $(".login");
            const $username = $("#admin span")
            const $exit = $("#admin a")
            if($.cookie("username")){
                $username.html($.cookie("username"));
                $admin.show();
                $login.hide();
            }
    
            $exit.on("click", function(){
                $.cookie("username","", { expires: -1 , path: '/' });
                $admin.hide();
                $login.show();
            })
        }
    }
})