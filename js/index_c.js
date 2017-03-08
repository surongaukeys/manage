/**
 * Created by Administrator on 2017/3/6 0006.
 */
//Collapsible Sidebar Menu左边侧导航点击
$('.sidebar-menu .openable > a').click(function() {

    if (!$('aside').hasClass('sidebar-mini') || Modernizr.mq('(max-width: 991px)')) {
        if ($(this).parent().children('.submenu').is(':hidden')) {
            $(this).parent().siblings().removeClass('open').children('.submenu').slideUp(200);
            $(this).parent().addClass('open').children('.submenu').slideDown(200);
        }
        else {
            $(this).parent().removeClass('open').children('.submenu').slideUp(200);
        }
    }
});