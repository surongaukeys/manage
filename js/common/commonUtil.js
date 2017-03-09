/**
 * Created by wisteria on 2016/6/3.
 */
/**
 * 判断是否为空
 */
/*给下拉菜单添加jq方法Val()*/
(function ($) {
    $.fn.Val = function (options) {
        $(this).val(options);
        $(this).prev().val(options);
        $(this).find('li').each(function () {
            var obj = $(this);
            obj.removeClass('li-checked');
            if (obj.attr('value') == options) {
                obj.addClass('li-checked');
                obj.parents('.new-box').next().val(obj.html());
            }
        });
        return $(this).val();
    }
})(jQuery);
function isNull(obj) {
    if (obj == null || obj == "" || obj.length == 0 || obj == "N/A" || obj == "undefined") {
        return true;
    } else {
        return false;
    }
}

function isAllNotEmpty(strs) {
    for (var i = 1; i < arguments.length; i++) {
        var str = arguments[i];
        if (str == null || (str + "").trim().length == 0)
            return false;
    }
    return true;
}

function isNotNull(obj) {
    return !isNull(obj);
}
/**
 * 判断是否为空并输出
 */
function outPutObject(obj, str) {
    if (isNull(obj)) {
        return str;
    } else {
        return obj;
    }
}

/**
 * 格式化数字，参数分别的数字，小数位数，数字后空格数(&nbsp;)
 * @author heguanyuan
 * */
function formateNum(num, decimalDigit, space) {
    if (isNaN(num))
        return num;
    var numStr = num + "";
    var spaceStr = "";
    var zeroStr = "";
    for (var i = 0; i < space; i++) {
        spaceStr += "&nbsp;";
    }
    if (numStr.indexOf(".") == -1 && decimalDigit > 0) {
        numStr += ".";
    }
    var digit = (numStr.indexOf(".") + decimalDigit) - (numStr.length - 1);
    if (digit < 0)
        return num.toFixed(decimalDigit) + "" + spaceStr;
    else {
        for (var j = 0; j < digit; j++) {
            zeroStr += "0";
        }
        return numStr + zeroStr + spaceStr;
    }
}

/**
 * 获取是第几周
 * 每年第一个周一开始为第一周
 * @auther heguanyuan 2017/2/16 11:59
 */
function getWeekOfYear(date) {
    // 按中国的习惯，每周的第一天为周一。
    var first = new Date(date.getFullYear(), 0, 1);
    var diff = date.getTime() - first.getTime();
    // date.getDay(),返回一周的第几天，第一天是周日，为0
    var span = (first.getDay() + 1) * dayLong - 1;
    var week = Math.ceil((diff - span) / (7 * dayLong));
    if (week == -0)
        week = 0;
    return week;
}

function isSpecialChar(str) {
    var b = /^[0-9a-zA-Z_,]*$/g;
    if (b.test($.trim(str))) {
        return true;
    } else {
        return false;
    }
}

//添加浮动块
$(function () {
    var leftDiv = '<div id="leftdiv"/>';
    var rightDiv = '<div id="rightdiv"/>';
    $("body").append(leftDiv);
    $("body").append(rightDiv);
});

/**
 * 动态调整浮动块的位置
 */
function resizediv() {
    if ($(window).scrollTop() > 327) {
        //全屏情况下
        if ($("header").css("display") == "none") {
            $("#leftdiv").addClass("floatdiv");
            $("#leftdiv").css({"top": "40px", "left": "0"});
            $("#rightdiv").addClass("floatdiv");
            $("#rightdiv").css({"top": "40px", "right": "-1px"});
            $('table').stickyTableHeaders({cacheHeaderHeight: true});
            //右侧边栏的情况
        } else if ($("aside").css("display") == 'block' && $("aside").css("left") == "-160px" && $("header").css("display") == "block") {
            $("#leftdiv").addClass("floatdiv");
            $("#leftdiv").css({"top": "100px", "left": "0"});
            $("#rightdiv").addClass("floatdiv");
            $("#rightdiv").css({"top": "100px", "right": "-1px"});
            $('table').stickyTableHeaders({cacheHeaderHeight: true});
            //有侧边栏的情况
        } else if ($("aside").css("display") == 'block' && $("aside").css("left") == "0px" && $("header").css("display") == "block") {
            $("#leftdiv").addClass("floatdiv");
            $("#leftdiv").css({"top": "100px", "left": "160px"});
            $("#rightdiv").addClass("floatdiv");
            $("#rightdiv").css({"top": "100px", "right": "-1px"});
            $('table').stickyTableHeaders({cacheHeaderHeight: true});
        } else {//无侧边栏的情况
            $("#leftdiv").addClass("floatdiv");
            $("#leftdiv").css({"top": "100px", "left": "0"});
            $("#rightdiv").addClass("floatdiv");
            $("#rightdiv").css({"top": "100px", "right": "-1px"});
            $('table').stickyTableHeaders({cacheHeaderHeight: true});
        }

    }
}

//点击全屏事件
function fullScreen(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if ($("header").css("display") == 'block') {
        //将滚动条置顶
        $(window).scrollTop(0);
        $("header").hide();
        $("aside").hide();
        $(".breadcrumb").css("top", "0");
        $("div .main-container").css("margin", "-60px 22px 0px 22px");
        $(".tableFloatingHeaderOriginal").removeClass("tablefloat");
        $(".tableFloatingHeaderOriginal").addClass("fulltablefloat");
        $(".index").css("margin-left", "0px");
        $(".index").css("overflow", "hidden");
        $('.pull-left.pagination-detail').css('left', 0);
        $('.fixed-table-pagination').css('margin-left', -22);
        $('.footer').css('margin-left', 0);
        $('.wrapper').css('margin', '0');
        resizediv();
        $('table').stickyTableHeaders({cacheHeaderHeight: true});
        $('#table').bootstrapTable('refresh');
    } else {
        //将滚动条置顶
        $(window).scrollTop(0);
        $("header").show();
        $("aside").show();
        $("div .main-container").css("margin-top", "0");
        $(".breadcrumb").css("top", "60px");
        $(".index").css("margin-left", "200px");
        $(".index").css("overflow", "auto");
        $(".tableFloatingHeaderOriginal").removeClass("fulltablefloat");
        $(".tableFloatingHeaderOriginal").addClass("tablefloat");

        $(".wrapper.no-left").css("margin-left", "0");
//		判断是否有左侧菜单，如果有   则把分页的margin-left设置为222px  否则设置为22px，去除左侧菜单的宽度200px
        if ($("aside").css("display") == 'block') {
            $('.pull-left.pagination-detail').css('left', 160);
            $('.wrapper').css('margin-left', '160px');
        } else {
            $('.pull-left.pagination-detail').css('left', 0);
            $('.wrapper').css('margin-left', 0);
        }
        resizediv();
        $('table').stickyTableHeaders({cacheHeaderHeight: true});
        //$('.fixed-table-pagination').css('margin-left',0);
       
    }
}

$(window).scroll(function () {
    var top = $(window).scrollTop();
    var dh = $(document).height();
    var wh = $(window).height();
    if (top >= dh - wh - 80) {
        $('.footer').removeClass('hidden');
        if ($('.fixed-table-pagination').parents('.no-page')[0] === undefined) {  //分页特殊的页面需加此行，并在页面加上no-page的后缀
            $('.fixed-table-pagination').css('bottom', 60);
            $('.fixed-table-pagination').css('height', 80);
            $('.pull-left.pagination-detail').css('bottom', 80);
            $('.pull-right.pagination').css('bottom', 80);
            $('.full-screen-switch-btn').css('bottom', 130); //全屏按钮
            $('.fixed-table-pagination').css('border-top', 'none');//分页div上边
            $('.fixed-table-pagination div.pagination, .fixed-table-pagination .pagination-detail').css('margin-top', 10);
            $('.fix_contain').css('bottom', 140)
        }
    } else {
        $('footer').addClass('hidden');
        $('.fix_contain').css('bottom', 58);
        if ($('.fixed-table-pagination').parents('.no-page')[0] === undefined) {
            $('.fixed-table-pagination').css('bottom', 0);
            $('.fixed-table-pagination').css('height', 58);
            $('.pull-left.pagination-detail').css('bottom', 0);
            $('.pull-right.pagination').css('bottom', 0);
            $('.full-screen-switch-btn').css('bottom', 50);
            $('.fixed-table-pagination').css('border-top', '1px solid #eee');
            $('.fixed-table-pagination div.pagination, .fixed-table-pagination .pagination-detail').css('margin-bottom', 10);
        }
    }
});


$(function () {
    if ($('.fixed-table-pagination').parents('.no-page')[0] === undefined) {
        $(window).scrollTop(0);
        $('.fixed-table-pagination').css('bottom', 0);
        $('.pull-left.pagination-detail').css('bottom', 0);
        $('.pull-right.pagination').css('bottom', 0);
        $('.full-screen-switch-btn').css('bottom', 50);
        $('.fixed-table-pagination div.pagination, .fixed-table-pagination .pagination-detail').css('margin-bottom', 10);
        $('.fixed-table-pagination').append('<div style="width:100%;height:1px;background:#eee"></div>');
    }
});
var selectPage;
//下拉菜单相关事件
//添加默认选中相关项功能:obj.val()

$(function () {
    //点击该框的时候下拉菜单显示
    $('.btn-group').off('click');
    $('.btn-group').click(function (e) {
        //默认选中第一个选项(在没有提示语的情况下)
        if (!$(this).find('li').hasClass('li-checked') && $(this).find('.textCheck').attr('placeholder') == null) {
            $(this).find('li').eq(0).addClass('li-checked');
        }
        var event = window.event || e;
        //边框颜色待定
        //$(this).find('#shopAccount').css('border','1px solid #31d3be')
        event.stopPropagation();
        $('.new-box').not($(this).find('.new-box')).slideUp(20);
        $(this).find('.new-box').slideToggle(20);
        $('.FuncState').css('display', 'none');
    });
    //默认加载第一个选项的数据
    for (var i = 0; i < $('.textCheck').length; i++) {
        if ($('.textCheck').eq(i).parent().find('.li-checked').length == 0) {//(在没有传默认取值的时候)
            $('.textCheck').eq(i).parent().val($('.textCheck').eq(i).prev().find('li').eq(0).attr('value'));
            $('.textCheck').eq(i).parent().prev().val($('.textCheck').eq(i).prev().find('li').eq(0).attr('value'));
            $('.textCheck').eq(i).val($('.textCheck').eq(i).prev().find('li').eq(0).html());
        } else {//有传值过来的时候
            $('.textCheck').eq(i).parent().val($('.textCheck').eq(i).prev().find('.li-checked').attr('value'));
            $('.textCheck').eq(i).parent().prev().val($('.textCheck').eq(i).prev().find('.li-checked').attr('value'));
            $('.textCheck').eq(i).val($('.textCheck').eq(i).prev().find('.li-checked').html());
        }
        if ($('.textCheck').eq(i).attr('placeholder') != null) {
            $('.textCheck').eq(i).parent().val('');
            $('.textCheck').eq(i).parent().prev().val('');
            $('.textCheck').eq(i).val('');
        }
    }
    $('#casAdminDiv').val($('#casAdminDiv').find('li').eq(0).val());
    $('#functionDiv').val($('#functionDiv').find('li').eq(0).val());
    $('#storeDiv').val($('#storeDiv').find('li').eq(0).val());
    $('#categoryDiv').val($('#categoryDiv').find('li').eq(0).val());
    //菜单的几种不同状态
    $('.new-box').find('li').hover(function (e) {
        var e = e || window.event;
        e.stopPropagation();
        if (!$(this).hasClass('li-checked')) {
            $(this).css('background', '#e8ecef');
        }
    }, function () {
        if (!$(this).hasClass('li-checked')) {
            $(this).css('background', '#fff');
        }
    });
    //选中其中一项之后的效果
    $('.new-box').find('li').click(function (e) {
        var event = window.event || e;
        event.stopPropagation();
        $(this).parent().slideUp(20);
        $(this).parent().parent().css('border', '1px solid #ccc');
        $(this).parent().find('li').removeClass('li-checked');
        $(this).parent().find('li').css({background: 'white', color: '#333'});
        $(this).addClass('li-checked');
        $(this).parent().next().val($(this).text());
        //关联数据不同情况取值
        $(this).parent().parent().val($(this).attr('value'));
        $(this).parent().parent().prev().val($(this).attr('value'));
    });
    //鼠标点击其他地方菜单消失
    $('html').click(function () {
        $('.new-box').slideUp(20);
        $('#shopAccount').css('border', '1px solid #ccc');
    });
    //重置之后字体颜色改变
    $('.reset').click(function () {
        for (var i = 0; i < $('.new-box').length; i++) {
            $('.new-box').eq(i).find('li').removeClass('li-checked');
            $('.new-box').eq(i).find('li').eq(0).addClass('li-checked');
        }
    });
    //如果下拉框的高度高于了一个值得时候呈下拉框
    for (var i = 0; i < $('.new-box').length; i++) {
        if ($('.new-box').eq(i).find('li').length > 6) {
            $('.new-box').eq(i).addClass('overflow_ul');
        }
    }
    //银联下拉框相关js
    $('#table').on('load-success.bs.table', function () {
        for (var i = 0; i < $('.citylist').length; i++) {
            $('.citylist').eq(i).find('span').eq(0).text($('.citylist').eq(i).find('.city-li-checked').text());
        }
        $('.citylist').parent().css({padding: '0'});
        //非最后两个框点击的时候
        $('#table tr').not(':last').find('.citylist').click(function (e) {
            var e = e || window.event;
            e.stopPropagation();
            $('.new_box_city').slideUp(20);
            $(this).find('.new_box_city').slideDown(20);
            //li的点击事件
            $(this).find('li').click(function (e) {
                var e = e || window.event;
                e.stopPropagation();
                $(this).parent().parent().find('span').eq(0).html($(this).html());
                $(this).parent().slideUp(20);
                $(this).parent().find('li').removeClass('city-li-checked');
                $(this).addClass('city-li-checked');
                //给相应的id元素赋予相应的value用来跟数据相对接
                $(this).parent().parent().val($(this).val());
            });
        });

        //点击文档其他地方会隐藏该框
        $(document).click(function () {
            $('.new_box_city').slideUp(20);
        });
        $('td').click(function () {
            $('.new_box_city').slideUp(20);
            //之前下拉菜单这个功能缺失现在补上
            $('.new-box').slideUp(20);
        });
        //最后一个框点击的时候往上弹
        $('#table tr').last().find('.citylist').click(function (e) {
            var e = e || window.event;
            e.stopPropagation();
            $('.new_box_city').slideUp(20);
            $(this).find('.new_box_city').slideDown(20);
            $(this).find('.new_box_city').css({position: 'relative', top: '-74px', zIndex: '0'});
            //li的点击事件
            $(this).find('li').click(function (e) {
                var e = e || window.event;
                e.stopPropagation();
                $(this).parent().parent().find('span').eq(0).html($(this).html());
                $(this).parent().slideUp(20);
                $(this).parent().find('li').removeClass('city-li-checked');
                $(this).addClass('city-li-checked');
                //给相应的id元素赋予相应的value用来跟数据相对接
                $(this).parent().parent().val($(this).val());
            });
        });
    });
});

//下拉菜单相关end
//导出Excel、pdf相关函数
$(function () {
    $('.addClick').click(function (e) {
        var event = window.event || e;
        event.stopPropagation();
        $(this).next().css('display', 'block');
        $('.new-box').css('display', 'none');
        $(this).next().find('li').click(function () {
            $(this).parent().css('display', 'none');
            $(this).parent().prev().find('span').first().html('导出' + $(this).text());
            $(this).parent().val($(this).find('a').attr('data-value'));
            //触发相关的下载函数
            exportPdfORExcel();
        });
    });
    $('html').click(function () {
        $('.new-menu').css('display', 'none');
    });
});
//模拟滚动条
var listing;
var countmore;
var newDiv;
var bs1;
var bs;
var leftx;
var countfba = 0;
var gundong;
var table_height;
var taskmanage;
var wish_list;
var timeout;
var left_width = 0;//用来区分wish页面有无左菜单的情况下的滚动
var no_page_scroll;
$(function () {
    gundong = function () {
        $('.fix_contain').remove();
        clearTimeout(timeout);
        left_width = 0;
        //做一个判断表格长度的动作
        if ($('#table').length != 0) {
            table_height = $('#table').height() + $('#table').offset().top - $(window).height() + 80;
        }
        if ($('#end_table').length != 0 && countfba == 1) {
            table_height = $('#end_table').height() + $('#end_table').offset().top - $(window).height() + 80;
        }
        //添加一个公共的可供扩展的类名
        if ($(".table-scroll").length != 0) {
            table_height = $('.table-scroll').height() + $('.table-scroll').offset().top - $(window).height() + 80;
        }
        if (table_height < 0) {//表格太短的时候
            ss = 0;
            $('.fix_contain').remove();
            $('.fixed-table-body').css('overflow-x', 'auto');
        } else {
            ss = 80;
            $('.fixed-table-body').css('overflow-x', 'hidden');
            newBox();
        }
        function newBox() {
            if ($('.contain_box').length == 0) {
                for (var i = 0; i < $(".fixed-table-pagination").length; i++) {
                    newDiv = $("<div class = 'fix_contain'><div class = 'contain_box'><div class = 'move_box'></div></div></div>");
                    if ($(".fixed-table-pagination").eq(i).css('display') == 'block') {
                        newDiv.insertBefore($(".fixed-table-pagination").eq(i));
                        $('.contain_box').width(0);
                        $('.move_box').width(0)
                    }
                }
                newBox2();
                function newBox2() {
                    if ($('#table').length != 0) {
                        //对查看结果特殊处理(wish页面)(在延时之后获取的值才是准确的)
                        if (taskmanage == 9) {
                            timerout = setTimeout(function () {
                                if ($('#table').width() - $('#table').parent().width() <= 5) {
                                    $('.fix_contain').remove();
                                } else {
                                    $('#table').parent().next().next().find('.contain_box').css('width', $('#table').parent().width() + 'px');
                                    $('#table').parent().next().next().find('.move_box').width(2 * ($('#table').parent().width()) - $('#table').width());
                                    if (2 * ($('#table').parent().width()) - $('#table').width() < 300) {
                                        $('#table').parent().next().next().find('.move_box').css('width', 100);
                                    }
                                }
                            }, 20);
                            if ($('.sidebar-menu').attr('left') < -10) {
                                left_width = 0;
                            } else {
                                left_width = 160;
                            }
                        } else {
                            $('#table').parents('.bootstrap-table').find('.contain_box').css('width', $('#table').parent().width() + 'px');
                            $('#table').parents('.bootstrap-table').find('.move_box').width(2 * ($('#table').parent().width()) - $('#table').width());
                            if (2 * ($('#table').parent().width()) - $('#table').width() < 300) {
                                $('#table').parent().next().next().find('.move_box').css('width', 100);
                            }
                            if ($('#table').eq(0).width() - $('#table').eq(0).parent().width() <= 5) {
                                $('.fix_contain').remove();
                            }
                        }
                    }
                    if (no_page_scroll == 9) {
                        $('.fix_contain').remove();
                        $('.fixed-table-body').css('overflow-x', 'auto');
                    }
                    if ($('#end_table').length != 0) {
                        $('.fix_contain').remove();
                        for (var i = 0; i < $('.fixed-table-body').length - 1; i++) {
                            newDiv = $("<div class = 'fix_contain'><div class = 'contain_box'><div class = 'move_box'></div></div></div>");
                            newDiv.insertBefore($(".fixed-table-pagination").eq(i));
                        }
                        $('#table').parent().next().next().find('.contain_box').css('width', $('#table').parent().width());
                        var length_move = 2 * $('#table').eq(0).parent().width() - $('#table').eq(0).width();
                        if (length_move < 300) {
                            length_move = 100;
                        }
                        $('#table').eq(0).parent().next().next().find('.move_box').css('width', length_move);
                        if ($('#table').eq(0).width() - $('#table').eq(0).parent().width() <= 5) {
                            $('.fix_contain').remove();
                            $('.fixed-table-body').eq(countmore).css('margin-bottom', 'inherit');
                        }
                        $('#end_table').parent().next().next().find('.contain_box').css('width', $('#end_table').parent().width());
                        $('#end_table').parent().next().next().find('.move_box').width(length_move);
                        if ($('#end_table').width() - $('#end_table').parent().width() <= 5) {
                            $('.fix_contain').remove();

                        }
                        //滚动条加粗事件
                        $('.fix_contain').hover(function () {
                                $(this).find('.contain_box').css('height', '14px');
                            }, function () {
                                $(this).find('.contain_box').css('height', '7px');
                            }
                        );
                    }
                    //如果是银联的加上去
                    if ($('#pay_table').length != 0) {
                        bankgundong();//为实现滚动条跟随table这个需求做准备
                        function bankgundong() {
                            $('.fix_contain').remove();
                            if ($('#pay_table').width() - $('#pay_table').parent().width() <= 5) {
                                $('.fix_contain').remove();
                                $('.fixed-table-body').eq(countmore).css('margin-bottom', 'inherit');
                            } else {
                                newDiv.insertBefore($('#pay_table').parent().next().next());
                                $('#pay_table').parent().next().next().find('.contain_box').css('width', $('#pay_table').parent().width() + 'px');
                                $('#pay_table').parent().next().next().find('.move_box').width(2 * ($('#pay_table').parent().width()) - $('#pay_table').width());
                            }
                        }
                    }
                    //对于扩展的类的方法
                    if ($(".table-scroll").length != 0) {
                        $('.fix_contain').remove();
                        if ($('.table-scroll').width() - $('.table-scroll').parent().width() <= 5) {
                            $('.fix_contain').remove();
                        } else {
                            newDiv.insertBefore($('.table-scroll').parent().next().next());
                            $('.table-scroll').parent().next().next().find('.contain_box').css('width', $('.table-scroll').parent().width() + 'px');
                            $('.table-scroll').parent().next().next().find('.move_box').width(2 * ($('.table-scroll').parent().width()) - $('.table-scroll').width());
                        }
                    }
                }

                //当改变窗口大小的时候重新计算滚动条的长度
                $(window).resize(function () {
                    gundong();
                    newBox3();
                });
                //wish左侧菜单收起的时候（滚动幅度相关）
                $('.expand-hidden').click(function () {
                    setTimeout(function () {
                        gundong();
                        newBox3();
                    }, 500);
                });
                //放大按钮被点击的时候
                $('.full-screen-switch-btn').click(function () {
                    setTimeout(function () {
                        gundong();
                        newBox2();
                        newBox3();
                    }, 500);
                });
            }
        }

        newBox3();
        //滑块的移动事件
        function newBox3() {
            $('.move_box').mousedown(function (e) {
                var e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var event = e || window.event;
                var cliX = event.offsetX;
                var cliY = event.offsetY;
                $(document).mousemove(function (e) {
                    var event = e || window.event;
                    var currentX = event.clientX;
                    var currentY = event.clientY;
                    if (currentX - cliX - left_width >= 0) {
                        if ($('#pay_table').length != 0) {//银联状态下
                            $('#pay_table').parent().next().next().find('.move_box').css('left', currentX - cliX + 'px');
                            bs1 = parseInt($('#pay_table').parent().next().next().find('.contain_box').css('width')) - parseInt($('#pay_table').parent().next().next().find('.move_box').css('width'));
                            bs = $('#pay_table').width() - $('#pay_table').parent().width();
                            leftx = $('.move_box').offset().left;
                            if (bs1 <= 300) {
                                bs1 = 300;//避免滚动条太短的时候会消失
                            }
                            $('.fixed-table-body').scrollLeft(leftx * bs / bs1);
                            $('table').stickyTableHeaders({cacheHeaderHeight: true});
                            if ($('.move_box').offset().left >= $('.contain_box').width() - $('.move_box').width()) {
                                $('.move_box').css('left', $('.contain_box').width() - $('.move_box').width());
                            }
                        } else if ($('#end_table').length != 0) {
                            if (countfba == 1) {//fba切换月末数据
                                $('.move_box').eq(1).css('left', currentX - cliX + 'px');
                                bs1 = $('.fixed-table-body').eq(1).width() - $('.move_box').eq(1).width();
                                bs = $('#end_table').width() - $('#end_table').parent().width();
                                leftx = $('.move_box').eq(1).offset().left;
                                if (bs1 <= 300) {
                                    bs1 = 300;//避免滚动条太短的时候会消失
                                }
                                $('.fixed-table-body').eq(1).scrollLeft(leftx * bs / bs1);
                                $('table').stickyTableHeaders({cacheHeaderHeight: true});
                                if ($('.move_box').eq(1).offset().left >= bs1) {
                                    $('.move_box').eq(1).css('left', bs1)
                                }
                            } else if (countfba == 0) {//fba tab切换月初数据
                                $('#table').parent().next().next().find('.move_box').css('left', currentX - cliX + 'px');
                                bs1 = $('.fixed-table-body').eq(0).width() - $('.move_box').eq(0).width();
                                bs = $('#table').width() - $('#table').parent().width();
                                if (bs1 <= 300) {
                                    bs1 = 300;//避免滚动条太短的时候会消失
                                }
                                leftx = $('.move_box').eq(0).offset().left;
                                $('.fixed-table-body').eq(0).scrollLeft(leftx * bs / bs1);
                                $('table').stickyTableHeaders({cacheHeaderHeight: true});
                                if ($('.move_box').eq(0).offset().left >= bs1) {
                                    $('.move_box').eq(0).css('left', bs1)
                                }
                            }

                        } else if ($('#table').length != 0) {//普通页面（没有tab切换）状态下
                            $('.move_box').css('left', currentX - cliX - left_width + 'px');
                            bs1 = parseInt($('#table').parents('.bootstrap-table').find('.contain_box').css('width')) - parseInt($('#table').parents('.bootstrap-table').find('.move_box').css('width'));
                            bs = $('#table').width() - $('#table').parent().width();
                            if (bs1 <= 300) {
                                bs1 = 300;//避免滚动条太短的时候会消失
                            }
                            leftx = $('.move_box').offset().left;
                            $('.fixed-table-body').scrollLeft(leftx);

                            $('table').stickyTableHeaders({cacheHeaderHeight: true});
                            if ($('.move_box').offset().left >= $('.contain_box').width() - $('.move_box').width()) {
                                $('.move_box').css('left', $('.contain_box').width() - $('.move_box').width());
                            }
                        } else if ($(".table-scroll").length != 0) {
                            $('.move_box').css('left', currentX - cliX - left_width + 'px');
                            bs1 = parseInt($('.table-scroll').parent().next().next().find('.contain_box').css('width')) - parseInt($('.table-scroll').parent().next().next().find('.move_box').css('width'));
                            bs = $('.table-scroll').width() - $('.table-scroll').parent().width();
                            if (bs1 <= 300) {
                                bs1 = 300;//避免滚动条太短的时候会消失
                            }
                            leftx = $('.move_box').offset().left;
                            $('.fixed-table-body').scrollLeft(leftx * bs / bs1);
                            $('table').stickyTableHeaders({cacheHeaderHeight: true});
                            if ($('.move_box').offset().left >= $('.contain_box').width() - $('.move_box').width()) {
                                $('.move_box').css('left', $('.contain_box').width() - $('.move_box').width());
                            }
                        }
                    } else {
                        $('.move_box').css('left', '0');
                        $('.fixed-table-body').scrollLeft(0);
                        $('table').stickyTableHeaders({fixedOffset: 0});
                    }
                    $(window).mouseup(function (e) {
                        $(document).off('mousemove');
                    });
                });

            });

        }
    };
    //文档加载完成以后执行滚动条加载动作
    //bank
    $('#table').on('load-success.bs.table', function () {
        gundong();
    });
    $('.component').on('load-success.bs.table', function () {
        gundong();
    });
    //pm
    $('.main-container').on('load-success.bs.table', function () {
        gundong();
    });

    //tab切换时候的相应传参
    $("a[data-toggle = 'tab']").eq(1).click(function () {
        countfba = 1;
        setTimeout(function () {
            gundong();
            $('#custom-modal').find('.fix_contain').remove();
        }, 300)


    });
    $("a[data-toggle = 'tab']").eq(0).click(function () {
        countfba = 0;
        setTimeout(function () {
            gundong();
            $('#custom-modal').find('.fix_contain').remove();
        }, 300)

    });
    //fba弹出框有滚动条问题修复
    $('.sel-up').click(function () {
        setTimeout(function () {
            $('#custom-modal').find('.fix_contain').remove();
        }, 30)
    });
    //wish页面左菜单变化的时候以及当放大屏幕功能使用的时候要改变相应的计算值
});

//搜索栏，按钮视觉控制开始
$(window).resize(function () {
    widthResp($('.search_l'), $('.search_r'), 1280);

});
$(function () {
    widthResp($('.search_l'), $('.search_r'), 1280)
});
var windowW;
function widthResp($search_l, $search_r, width) {
    windowW = window.innerWidth;//浏览器窗口可视宽度
    var newda;
    var newWith;
    $('.footer').ready(
        function () {
            newda = $search_l.height();
            newWith = $search_l.width();
            if ($('.no-left')) {  //无左侧菜单
                if (newWith < windowW - $search_r.width() - 66) {
                    $search_r.width(196);
                } else {
                    $search_r.width(90);
                }

                if (newda > 48) {
                    $search_r.width(90);
                    $('.search-form-div').css('padding', '9');
                    $('.search-form-div').css({'padding-left': '0', 'padding-right': '0'});
                } else {
                    $('.search-form-div').css('padding', '13');
                    $('.search-form-div').css({'padding-left': '0', 'padding-right': '0'});
                }
                for (var i = 0; i < $search_r.length; i++) {
                    if ($search_r.eq(i).find('button').length == 1) {
                        $search_r.eq(i).width(90);
                    }
                }

            } else {
                if (newWith < windowW - $search_r.width() - 66 - 160) {

                    $search_r.width(196);
                } else {
                    $search_r.width(90);
                }

                if (newda > 48) {
                    $search_r.width(90);
                    $('.search-form-div').css('padding', '9');
                    $('.search-form-div').css({'padding-left': '0', 'padding-right': '0'});
                } else {
                    $('.search-form-div').css('padding', '13');
                    $('.search-form-div').css({'padding-left': '0', 'padding-right': '0'});
                }
                if ($search_r.find('button').length == 1) {
                    $search_r.width(90);
                }
            }
        })
}
//搜索栏，按钮视觉控制结束

//复选框宽度
$(function () {
    $('#table').on('post-body.bs.table', function () {
        for (var i = 0; i < $('#table tr').length; i++) {
            $('#table tr').eq(i).find('.bs-checkbox').css('width', '40');
        }
    });
});
$(function () {
    $('.table').on('post-body.bs.table', function () {
        for (var i = 0; i < $('.table tr').length; i++) {
            $('.table tr').eq(i).find('.bs-checkbox').css('width', '40');
        }
    });
});
//wish页面下边显示不完全修改以及多选下拉框样式修改
$(function () {
    var timer;
    var timer1;
    var timeout;
    //表格加载完毕之后才能进行相应操作
    $('.footer').ready(function () {
        $('.expand-hidden').click(function () {
            $('.footer').css('margin-left', '0');
            timer1 = setInterval(function () {
                if ($("aside").css("display") == 'block' && $("aside").css("left") == "-160px" && $("header").css("display") == "block") {
                    resizediv();
                    clearInterval(timer1);
                }
            }, 20)
        });
        $('.expand-hidden01').click(function () {
            $('.footer').css('margin-left', '160px');
            timer1 = setInterval(function () {
                if ($("aside").css("display") == 'block' && $("aside").css("left") == "0px" && $("header").css("display") == "block") {
                    resizediv();
                    clearInterval(timer1);
                }
            }, 20)
        });
    });
});
var wish_tab;//wish项目特殊化处理参数
var cas_index;//cas项目特殊化处理参数
$(function () {
    //倒角图片插入
    function corner_tab() {
        $('.nav-tabs').ready(function () {
            //初始化
            if ($('.nav-tabs').find('.active_cas').length != 0) {
                var cas_s_left = $("<img class = 'corder_right' src='../images/tab_Rounded-corners_right.png' /><img class = 'corder_left' src='../images/tab_Rounded-corners_left.png' />");
                cas_s_left.insertAfter($('.nav-tabs').find('.active_cas').find('a'));
            } else if ($('.nav-tabs').find('.active').length != 0) {
                if (cas_index == 9) {
                    var s_left = $("<img class = 'corder_right' src='../images/tab_Rounded-corners_right.png' /><img class = 'corder_left' src='../images/tab_Rounded-corners_left.png' />");
                    s_left.insertAfter($('.nav-tabs').find('.active').find('a'));
                } else {
                    var s_left = $("<img class = 'corder_right' src='/images/tab_Rounded-corners_right.png' /><img class = 'corder_left' src='/images/tab_Rounded-corners_left.png' />");
                    s_left.insertAfter($('.nav-tabs').find('.active').find('a'));
                }
            }
            //点击的时候
            $('.nav-tabs li').click(function () {
                var _this = $(this);
                if (wish_tab == 9) {
                    $('.corder_left').remove();
                    $('.corder_right').remove();
                    setTimeout(function () {
                        var s_left = $("<img class = 'corder_right' src='../images/tab_Rounded-corners_right.png' /><img class = 'corder_left' src='../images/tab_Rounded-corners_left.png' />");
                        s_left.insertAfter(_this.find('a'));
                    }, 100)
                } else {
                    if ($('.active_cas').length != 0) {
                        cas_s_left.insertAfter($(this).find('a'));
                    } else if ($('.active').length != 0) {
                        s_left.insertAfter($(this).find('a'));
                    }
                }
            });
        })
    }

    if (wish_tab == 9) {
        $('.corder_left').remove();
        $('.corder_right').remove();
        setTimeout(function () {
            corner_tab();
        }, 1000)
    } else {
        corner_tab();
    }
});
//多选框选择功能
function multipleChoice(first_value)//传入第一项的value值
{
	var platformChanged = false;
	$('.selectpicker').on('changed.bs.select', function (e, clickedIndex) 
		{
            platformChanged = true;
            var selects = $(this).selectpicker('val');
            var total = $(this).find('option').length;
            selects = selects == null ? [] : selects;
            if (selects.length == 0 || selects.length == total){
            	 //特殊判断（只有一条选择的时候）
            	 if(total == 2){
            		 $(this).selectpicker('val',$(this).find('option').eq(1).val());
            	 }else{
            		 $(this).selectpicker('val', first_value);
            	 }
            }
            else {
                if (clickedIndex == 0) {
                    $(this).selectpicker('deselectAll');
                    $(this).selectpicker('val', first_value);
                } else if (clickedIndex > 0) {
                    if (selects.indexOf(first_value) == 0)
                        $(this).selectpicker('val', selects.splice(1, selects.length));
                    else if (selects.indexOf(first_value) == -1 && selects.length == total - 1) {
                        $(this).selectpicker('val', first_value);
                    }
                };
            };
        }
	); 
};
//重置按钮功能
function resetButton(form){
	form.reset();//清除所有原生表单
	$('.selectpicker').selectpicker('val', '');//清除所有多选框
	$(form).find('.new-box').each(function()//清除所有的单选框
		{
			$(this).parent().Val($(this).find('li').first().attr("value"));
		}
	);
}

