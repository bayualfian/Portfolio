$(document).ready(function () {
    function j(a) {
        var b = a.outerWidth();
        if (a.hasClass("slide")) {
            if (a.hasClass("right")) {
                var c = "right"
            } else {
                var c = "left"
            }
        } else {
            var c = "fade"
        }
        if (c == "left") {
            a.animate({
                left: -b
            }, 300, function () {
                $(this).css("display", "none")
            })
        } else if (c == "right") {
            a.animate({
                right: -b
            }, 300, function () {
                $(this).css("display", "none")
            })
        } else {
            a.animate({
                opacity: 0
            }, 300, function () {
                $(this).css("display", "none")
            })
        }
    }
    function i(a) {
        var b = h(a);
        if (b != null && b != "") {
            return true
        } else {
            return false
        }
    }
    function h(a) {
        var b, c, d, e = document.cookie.split(";");
        for (b = 0; b < e.length; b++) {
            c = e[b].substr(0, e[b].indexOf("="));
            d = e[b].substr(e[b].indexOf("=") + 1);
            c = c.replace(/^\s+|\s+$/g, "");
            if (c == a) {
                return unescape(d)
            }
        }
    }
    function g(a, b, c) {
        c = typeof c !== "undefined" ? c : 7;
        var d = new Date;
        d.setDate(d.getDate() + c);
        var e = escape(b) + (c == null ? "" : "; expires=" + d.toUTCString());
        document.cookie = a + "=" + e
    }
    function e() {
        $("div#logo").css({
            position: "fixed",
            left: $("#container>div.wrapper").offset().left - 10
        })
    }
    function c() {
        $("img.stretch-fit").css("width", $(window).width())
    }
    function b() {
        var a = ($(window).width() - 920) / 2;
        if ($(window).width() > 1200) {
            $("img.hero").css("width", $(window).width()).css("margin-left", -a)
        } else {
            $("img.hero").css("width", "").css("margin-left", "")
        }
    }
    function a() {
        var a = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $("body").append(a);
        var b = $("div", a).innerWidth();
        a.css("overflow-y", "scroll");
        var c = $("div", a).innerWidth();
        $(a).remove();
        return b - c
    }
    b();
    c();
    e();
    window.onresize = function () {
        if (typeof my_repo !== "undefined") {
            my_repo()
        }
        b();
        c();
        e()
    };
    scrollbar_width = a();
    var f = setInterval(function () {
        go = false;
        $(".current .end-site-laptop .slide-images img").each(function (a) {
            if (go) {
                $(this).addClass("active");
                go = false;
                return
            }
            if ($(this).hasClass("active")) {
                go = true;
                $(this).removeClass("active");
                if (a == $(".current .end-site-laptop .slide-images img").length - 1) {
                    $(".current .end-site-laptop .slide-images img:first").addClass("active");
                    return
                }
            }
        })
    }, 2e3);
    $(".notification, .perm-tip").each(function () {
        var a = "notification-" + $(this).attr("id") + "-hide";
        if (i(a)) {
            $(this).css("display", "none")
        } else {
            $(this).children(".icon-close").on("click", function (b) {
                b.preventDefault();
                g(a, true);
                j($(this).parent())
            })
        }
    });
    $(".toc a").click(function (a) {
        function c() {
            if ($(".current").attr("id") !== "page-cover") {
                $("#logo").animate({
                    opacity: 0
                }, 1e3)
            }
            $("#toc").animate({
                opacity: 0
            }, 500, function () {
                $("#toc").css("display", "none")
            })
        }
        function b() {
            $("#toc").css("display", "block").css({
                opacity: 0,
                "z-index": 950
            });
            $("#contact").css("z-index", 900);
            $("#logo").animate({
                opacity: 1
            }, 500, function () {
                $("#contact").css("display", "none")
            });
            $("#toc").animate({
                opacity: 1
            }, 500)
        }
        a.preventDefault();
        if (!i("notification-nav-tip-hide")) {
            g("notification-nav-tip-hide", true);
            j($("#nav-tip"))
        }
        if ($("#toc").css("display") == "none") {
            b()
        } else {
            c()
        }
        $("#toc .close").click(c)
    });
    $(".contact a").click(function (a) {
        function c() {
            if ($(".current").attr("id") !== "page-cover") {
                $("#logo").animate({
                    opacity: 0
                }, 1e3)
            }
            $("#contact").animate({
                opacity: 0
            }, 500, function () {
                $("#contact").css("display", "none")
            })
        }
        function b() {
            $("#contact form fieldset").css("opacity", 1);
            $("#contact .success").css("display", "none");
            $("#contact").css("display", "block").css({
                opacity: 0,
                "z-index": 950
            });
            $("#toc").css("z-index", 900);
            $("#logo").animate({
                opacity: 1
            }, 500, function () {
                $("#toc").css("display", "none")
            });
            $("#contact").animate({
                opacity: 1
            }, 500)
        }
        a.preventDefault();
        if ($("#contact").css("display") == "none") {
            b()
        } else {
            c()
        }
        $("#contact .close").click(c)
    });
    $("#submit").click(function (a) {
        a.preventDefault();
        var b = false;
        var c = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var d = $("#field-email").val();
        if (d == "") {
            alert("Please enter an email address.");
            b = true
        } else if (!c.test(d)) {
            alert("Please enter a valid email address.");
            b = true
        }
        var e = $("#field-subject").val();
        if (e == "") {
            alert("Please enter a subject.");
            b = true
        }
        var f = "Message from: " + $("#field-name").val() + "\n" + $("#field-message").val();
        if (f == "") {
            alert("Please enter a message.");
            b = true
        }
        if (b == false) {
            $.post("http://caseybritt.com/sendemail.php", {
                emailTo: "contact@caseybritt.com",
                emailFrom: d,
                subject: e,
                message: f
            }, function (a) {
                $("#contact form fieldset").animate({
                    opacity: 0
                }, 1e3, function () {
                    $("#contact .success").css("display", "block").animate({
                        opacity: 1
                    }, 1e3)
                })
            })
        }
        return false
    });
    var k = true;
    window.pageAnimations = function (a) {
        b();
        c();
        e();
        var f = a.attr("id").substr(5);
        var g = ["cover", "resume", "about-this-site", "my-story"];
        if (k) {
            d = 4e3;
            k = false
        } else {
            d = 100;
            $(".current .video-js").each(function () {
                _V_($(this).attr("id"), {
                    controls: true
                })
            })
        }
        if (jQuery.inArray(f, g) == -1) {
            if ($("#logo").css("opacity") > 0) {
                $("#logo").delay(d).animate({
                    opacity: 0
                }, 1e3);
                $(".side-tip").delay(d).animate({
                    opacity: 0
                }, 800)
            }
        }
        if (jQuery.inArray(f, g) !== -1) {
            if ($("#logo").css("opacity") < 1) {
                $("#logo").animate({
                    opacity: 1
                }, 1e3);
                if (f == "cover") {
                    $(".side-tip").animate({
                        opacity: 1
                    }, 1e3)
                }
            }
            if (f !== "cover") {
                $(".side-tip").delay(d).animate({
                    opacity: 0
                }, 800)
            }
        }
        if (f == "my-story") {
            $(".me-1 .row, .me-1 .the-bar").css("margin-left", scrollbar_width / 2 + "px")
        }
    }
})