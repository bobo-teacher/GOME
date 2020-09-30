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
                    <li>
                        <a href="detail.html?sid=${value.sid}">
                            <img class="lazy" data-original="${value.url}" width="200" height="200">
                            <p>${value.title}</p>
                            <span class="price">¥${value.price}</span>
                            <span>销量${value.sailnumber}</span>
                        </a>
                    </li>
                `
                })
                $oUl.html($renderstr);

                //重置数组
                array_default = [];
                array = [];
                prev = null;
                next = null;
                $(".list li").each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                })

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
                            <li>
                                <a href="detail.html?sid=${value.sid}">
                                    <img class="lazy" data-original="${value.url}" width="200" height="200">
                                    <p>${value.title}</p>
                                    <span class="price">¥${value.price}</span>
                                    <span>销量${value.sailnumber}</span>
                                </a>
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
                        $(".list li").each(function (index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        })
                    })
                }
            })

            //默认排序
            $(".btnlist button").eq(0).on("click",function(){
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
            })
        }
    }
})