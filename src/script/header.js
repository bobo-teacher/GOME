// 头部广告轮播
let $lunboli = $(".lunbo li");
let $left = $(".head-btn .left");
let $right = $(".head-btn .right");
let length = $lunboli.size();
let count = 1;
let timer = null;

function tabswitch() {
    console.log("调用了头部轮播")
    if (count > length - 1) {
        count = 0
    }
    if (count < 0) {
        count = length - 1;
    }
    $lunboli.eq(count).show().siblings().hide()
}
console.log($right)
$right.on("click", function () {
    tabswitch();
    count++;
})
$left.on("click", function () {
    console.log("左")
    tabswitch();
    count--;
})
timer = setInterval(function () {
    tabswitch()
    count++;
}, 3000)
$(".head-btn,.lunbo").hover(function () {
    clearInterval(timer)
}, function () {
    timer = setInterval(function () {
        tabswitch()
        count++;
    }, 3000)
})