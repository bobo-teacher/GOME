define(["pagination", "jlazyload"], function () {
    return {
        init: function () {
            const $oUl = $(".list ul");
            let array_default = [];//排序前的li数组
            let array = [];//排序中的数组
            let prev = null;//前一个价格
            let next = null;//后一个价格
            $.ajax({
                url: 'http://localhost:8080/fuwuqi/GOME/php/listdata.php',
                dataType: "json"
            }).done((data) => {
                let $renderstr = "";
                $.each(data, function (index, value) {
                    $renderstr += `
                    <li class="goods">
                        <a href="">
                            <img src="${value.url}" alt="">
                        </a>
                        <p class="price">¥${value.price}</p>
                        <p class="title">
                            <a href="">
                                ${value.title}
                            </a>
                        </p>
                        <p class="evaluate">
                            <a href="">
                                已有
                                <span class="nums">${value.sailnumber}</span>
                                人评价
                            </a>
                        </p>
                        <p class="shop">
                            <span>自营</span>
                        </p>
                        <ul class="option clearfix">
                            <li>
                                <i class="i_1"></i>
                            </li>
                            <li>
                                <i class="i_2"></i>
                            </li>
                            <li>
                                <i class="i_3"></i>
                            </li>
                            <li>
                                <i class="i_4"></i>
                            </li>
                        </ul>
                    </li>
                `
                })
                $oUl.html($renderstr);

                //重置数组
                array_default = [];
                array = [];
                prev = null;
                next = null;
                $(".list .goods").each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                })
                console.log(array_default);

                //懒加载
                $(function () {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            })

            //分页
            $(".page").pagination({
                pageCount: 3,
                jump: true,
                coping: true,
                prevContent: "上一页",
                nextContent: "下一页",
                homePage: "首页",
                endPage: "尾页",
                callback: function (api) {
                    $.ajax({
                        url: "http://localhost:8080/fuwuqi/GOME/php/listdata.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: "json"
                    }).done(function (data) {
                        let $renderstr = "";
                        $.each(data, function (index, value) {
                            $renderstr += `
                            <li class="goods">
                                <a href="">
                                    <img src="${value.url}" alt="">
                                </a>
                                <p class="price">¥${value.price}</p>
                                <p class="title">
                                    <a href="">
                                        ${value.title}
                                    </a>
                                </p>
                                <p class="evaluate">
                                    <a href="">
                                        已有
                                        <span class="nums">${value.sailnumber}</span>
                                        人评价
                                    </a>
                                </p>
                                <p class="shop">
                                    <span>自营</span>
                                </p>
                                <ul class="option clearfix">
                                    <li>
                                        <i class="i_1"></i>
                                    </li>
                                    <li>
                                        <i class="i_2"></i>
                                    </li>
                                    <li>
                                        <i class="i_3"></i>
                                    </li>
                                    <li>
                                        <i class="i_4"></i>
                                    </li>
                                </ul>
                            </li>
                        `
                        })
                        $oUl.html($renderstr);
                        //懒加载
                        $(function () {
                            $("img.lazy").lazyload({ effect: "fadeIn" });
                        });

                        //重置数组
                        array_default = [];
                        array = [];
                        prev = null;
                        next = null;
                        $(".list .goods").each(function (index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        })
                    })
                }
            })

            //排序
            let count = 0;
            $rule_li = $(".rule li");
            $rule_li.on("click", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            $rule_price = $(".rule_price");
            $rule_price.on("click", function () {
                count++;
                if(count % 2 == 1){
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            prev = parseFloat(array[j].find(".price").html().substring(1));
                            next = parseFloat(array[j + 1].find(".price").html().substring(1));
                            if (prev > next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                }else{
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            prev = parseFloat(array[j].find(".price").html().substring(1));
                            next = parseFloat(array[j + 1].find(".price").html().substring(1));
                            if (prev < next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                }
                
                $.each(array, function (index, value) {
                    $(".list>ul").append(value);
                })
            })
            //默认排序
            /* $(".btnlist button").eq(0).on("click",function(){
                $.each(array_default,function(index,value){
                    $(".list ul").append(value);
                })
            })

            //升序
            $(".btnlist button").eq(1).on("click",function(){
                for(let i = 0;i < array.length;i++){
                    for(let j = 0;j < array.length - i - 1;j++){
                        prev = parseFloat(array[j].find(".price").html().substring(1));
                        next = parseFloat(array[j + 1].find(".price").html().substring(1));
                        if(prev > next){
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array,function(index,value){
                    $(".list ul").append(value);
                })
            })

            //降序
            $(".btnlist button").eq(2).on("click",function(){
                for(let i = 0;i < array.length;i++){
                    for(let j = 0;j < array.length - i - 1;j++){
                        prev = parseFloat(array[j].find(".price").html().substring(1));
                        next = parseFloat(array[j + 1].find(".price").html().substring(1));
                        if(prev < next){
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array,function(index,value){
                    $(".list ul").append(value);
                })
            })


            $oUl.on("mouseover", "li", function () {
                $(this).css({
                    border: "1px solid red"
                })
            })
            $oUl.on("mouseout", "li", function () {
                $(this).css({
                    border: "1px solid #ccc"
                })
            }) */
        }
    }
})