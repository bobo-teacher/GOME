define([],function(){
    return {
        init:function(){
            $everydayli = $("#everydaylist li");
            $oneF_ul = $(".oneF_r ul")
            $.ajax({
                url:"http://localhost:8080/fuwuqi/GOME/php/index_everyday_rander.php",
                dataType:"json"
            }).done(function(data){
                //渲染美日抢购
                $.each(data,function(index,value){
                    $everydayli.eq(index).find("img").attr("src",value.url);
                    $everydayli.eq(index).find(".price").html("¥" + value.price);
                    $everydayli.eq(index).find(".title").html(value.title);
                })

                //渲染楼层
                $randerstr = "";
                $.each(data,function(index,value){
                    console.log(index);
                    $randerstr += `
                    <li>
                        <a href="">
                            <img src="${value.url}" alt="">
                            <p class="title">${value.title}</p>
                            <p class="price">¥${value.price}</p>
                        </a>
                    </li>
                    `
                    if(index > 8){
                        return false;
                    }
                })
                $oneF_ul.html($randerstr)
            })
        }
    }
})