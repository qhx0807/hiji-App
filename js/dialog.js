(function (window) {
    var dialog = function () {
        var timerCount = {};
        var option = {};//option 必须含有obj(type(弹出框类型) append对象，title(html标签)，回调函数func，subTitle（非必须参数,html标签）),
        this.init = function (op) {
            option = op;
            creatDialog();
        };
        var creatDialog = function () {
            if (option.type) {

                if (option.type === "alert") {
                    //alert类型 弹出警告 有一个确定按钮 默认宽度200px
                    var dialog_cont = $("<div class='dialog-bg'><div class='alert-box'><div class='dialog-body'></div><div class='dialog-foot'><span class='a-ok'></span></div></div></div>");
                    if (option.title) {
                        dialog_cont.find(".dialog-body").append(option.title);
                    }
                    if (option.content) {
                        dialog_cont.find(".dialog-body").append(option.content);
                    }
                    dialog_cont.find('.a-ok').html("确定");

                } else if (option.type === "body") {
                    //body类型 适合多内容展示 有确定和取消两个按钮
                    var dialog_cont = $("<div class='dialog-bg'><div class='body-box'><div class='dialog-head'></div><div class='dialog-body'></div><div class='dialog-foot'><span class='a-ok'></span><span class='a-canc'></span></div></div><div class='dialog-foot'></div></div>");
                    if (option.title) {
                        dialog_cont.find(".dialog-head").html(option.title);
                    }
                    if (option.content) {
                        dialog_cont.find(".dialog-body").append(option.content);
                    }
                    if (option.ok) {
                        dialog_cont.find('.a-ok').html(option.ok);
                    } else {
                        dialog_cont.find('.a-ok').html("确定");
                    }
                    if (option.close) {
                        dialog_cont.find('.a-canc').html(option.close);
                    } else {
                        dialog_cont.find('.a-canc').html("取消");
                    }
                    if (option.addclass) {
                        dialog_cont.find('.body-box').addClass(option.addclass);
                    }

                } else if (option.type === "tips") {
                    //tips类型 用于提示框 定时自动关闭 默认2000 tips类型不带背景遮罩!
                    var dialog_cont = $("<div class='tips-box'></div>");
                    if (option.content) {
                        dialog_cont.html(option.content);
                    }

                    if(timerCount.timer){
                        clearTimeout(timerCount.timer);
                    }
                    var time;
                    if (option.time) {
                        time = option.time;
                    } else {
                        time = 2000;
                    }
                    timerCount.timer = setTimeout(function () {
                        dialog_cont.remove();
                        if (typeof (option.func) == "function") {
                            option.func();
                        }
                    }, time);
                } else if (option.type === "bottom") {
                    //bottom类型 底部弹窗
                    var dialog_cont = $("<div class='dialog-bg'><div class='dialog-bottom'><div class='dialog-head'></div><div class='dialog-body'></div></div></div>");
                    if (option.content) {
                        dialog_cont.find(".dialog-body").append(option.content);
                    }
                    if (option.title) {
                        dialog_cont.find(".dialog-head").append(option.title);
                    }
                } else if (option.type === "info") {
                    //info类型 适合信息展示 右上角有关闭按钮
                    var dialog_cont = $("<div class='dialog-bg'><div class='dialog-info'><div class='dialog-head'><span class='title-head'></span><span class='b-close'></span></div><div class='dialog-body'></div><div class='dialog-foot'></div></div></div>");
                    if (option.content) {
                        dialog_cont.find(".dialog-body").append(option.content);
                    }
                    if (option.title) {
                        dialog_cont.find(".title-head").html(option.title);
                    }
                    //如果想添加提交按钮
                    if (option.sub) {
                        dialog_cont.find(".dialog-foot").append("<span class='a-ok'>" + option.sub + "</span>");

                    }
                }
            }
            bindEvent(dialog_cont);
            $('body').append(dialog_cont);
        };
        var bindEvent = function (con) {
            if($(".a-canc")){
                con.find(".a-canc").click(function () {
                    $(this).parents(".dialog-bg").remove();
                });
            }
            if($(".b-close")){
                con.find(".b-close").click(function () {
                    $(this).parents(".dialog-bg").remove();
                });
            }
            if($(".a-ok")){
                con.find(".a-ok").on("click", function (e) {
                    e.stopPropagation();
                    if (typeof (option.func) == "function") {
                        option.func();
                    }
                    $(this).parents(".dialog-bg").remove();
                    return false;
                });
            }

        }
    };
    window.dialog = new dialog();
})(window);