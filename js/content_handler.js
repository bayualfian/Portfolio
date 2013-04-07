$(document).ready(function () {
    function u() {
        var a = window.navigator.userAgent,
            b = a.indexOf("OS ");
        if ((a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1) && b > -1) {
            return window.Number(a.substr(b + 3, 3).replace("_", "."))
        } else {
            return 0
        }
    }
    function t() {
        $("#blocker").css("display", "block");
        $("#pages .page").each(function (a) {
            if (c == "next") {
                var b = a + 1
            } else if (c == "prev") {
                var b = a - 1
            }
            if ($(this).hasClass("current")) {
                $(this).removeClass("current");
                $("#pages .page:eq(" + b + ")").addClass("current");
                return false
            }
        });
        var a = g + extraPages;
        var e = g - extraPages;
        if (c == "next") {
            g++;
            currentPage = f[g - 1].page_id;
            if (a <= f.length - 1) {
                s()
            }
        } else if (c == "prev") {
            g--;
            currentPage = f[g - 1].page_id;
            if (e >= 0) {
                s()
            }
        }
        if (!d) {
            var h = f[g - 1].page_name,
                i = siteUrl + f[g - 1].chapter_url + "/" + f[g - 1].page_url,
                j = {
                    direction: c,
                    currentPageOverall: g
                };
            window.history.pushState(j, h, i);
            if (u() < 5 && (b.search("iphone") > -1 || b.search("ipad") > -1 || b.search("ipod") > -1)) {
                window.location.hash = "cb";
                window.history.back()
            }
        }
        d = true
    }
    function s() {
        if (c == "next") {
            var a = g + extraPages
        } else if (c == "prev") {
            var a = g - extraPages
        }
        if (a > f.length || a <= 0) {
            return false
        }
        var b = '<article id="page-temp" class="page">' + "\n";
        b += "</div>" + "\n";
        if (c == "next") {
            $("#pages").append(b)
        } else if (c == "prev") {
            $("#pages").prepend(b)
        }
        console.log(isiPad);
        $.getJSON(siteUrl + "getcontent.php", {
            current_page: currentPage,
            direction: c,
            is_ipad: isiPad,
            is_firefox: isFirefox
        }, function (a) {
            var b = a;
            $("#page-temp").attr("id", "page-" + b[0].page_url);
            var c = b[0].settings.scrollable !== "false" ? "scrollable vertical " : "";
            c += b[0].settings.paginated == "true" ? "paginated " : "";
            var d = b[0].content + "\n";
            $("#pages #page-" + b[0].page_url).addClass(c).html(d)
        })
    }
    function r() {
        if (g <= extraPages) {
            var a = extraPages + g
        } else if (f.length - g <= extraPages) {
            var a = extraPages + f.length - g + 1
        } else {
            var a = extraPages * 2 + 1
        }
        if ($("#pages .page").length > a) {
            if (c == "next") {
                $("#pages .page:first .video-js").each(function () {
                    console.log("here");
                    delete _V_.players[$(this).attr("id")]
                });
                $("#pages .page:first").remove()
            } else if (c == "prev") {
                $("#pages .page:last .video-js").each(function () {
                    console.log("here 2");
                    delete _V_.players[$(this).attr("id")]
                });
                $("#pages .page:last").remove()
            }
        }
        $("#pages").css("width", $(".page").length * $(window).width());
        $(".page").css({
            width: $(window).width(),
            display: "block"
        });
        $(".page").each(function (a) {
            if ($(this).hasClass("current")) {
                var b = -a * $(window).width();
                $("#pages").css({
                    "-webkit-transform": "",
                    "-moz-transform": "",
                    "-o-transform": "",
                    transform: "",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: "",
                    "-webkit-animation": "",
                    "-moz-animation": "",
                    "-o-animation": "",
                    animation: "",
                    "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                    "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                    "-o-transform": "translate3d(" + b + "px, 0, 0)",
                    transform: "translate3d(" + b + "px, 0, 0)"
                });
                pageAnimations($(this))
            }
        });
        $("#blocker").css("display", "none");
        c = false
    }
    function q() {
        $.getJSON(siteUrl + "getcontent.php", {
            all: true,
            is_ipad: isiPad,
            is_firefox: isFirefox
        }, function (a) {
            j = a;
            for (i = 0; i < j.length; i++) {
                pg = j[i];
                if (currentPage == pg.page_id) {
                    g = i + 1;
                    h = g
                }
                l.data.currentPageOverall = g;
                l.title = pg.page_name;
                window.history.replaceState(l.data, l.title, l.url);
                k = true;
                f.push({
                    chapter_url: pg.chapter_url,
                    chapter_name: pg.chapter_name,
                    page_url: pg.page_url,
                    page_name: pg.page_name,
                    chapter_id: pg.chapter_id,
                    page_id: pg.page_id
                })
            }
            r()
        })
    }
    function p(a) {
        if (a == "next" && g >= f.length) {
            var b = -$("#pages #page-" + f[g - 1].page_url).position().left - 30;
            $("#pages").css({
                "-webkit-transition": "all .25s ease-out",
                "-moz-transition": "all .25s ease-out",
                "-o-transition": "all .25s ease-out",
                transition: "all .25s ease-out",
                "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                "-o-transform": "translate3d(" + b + "px, 0, 0)",
                transform: "translate3d(" + b + "px, 0, 0)"
            });
            setTimeout(function () {
                var a = -$("#pages #page-" + f[g - 1].page_url).position().left;
                $("#pages").css({
                    "-webkit-transition": "all .25s ease-in",
                    "-moz-transition": "all .25s ease-in",
                    "-o-transition": "all .25s ease-in",
                    transition: "all .25s ease-in",
                    "-webkit-transform": "translate3d(" + a + "px, 0, 0)",
                    "-moz-transform": "translate3d(" + a + "px, 0, 0)",
                    "-o-transform": "translate3d(" + a + "px, 0, 0)",
                    transform: "translate3d(" + a + "px, 0, 0)"
                })
            }, 250);
            return false
        }
        if (a == "prev" && g <= 1) {
            var b = -$("#pages #page-" + f[g - 1].page_url).position().left + 30;
            $("#pages").css({
                "-webkit-transition": "all .25s ease-out",
                "-moz-transition": "all .25s ease-out",
                "-o-transition": "all .25s ease-out",
                transition: "all .25s ease-out",
                "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                "-o-transform": "translate3d(" + b + "px, 0, 0)",
                transform: "translate3d(" + b + "px, 0, 0)"
            });
            setTimeout(function () {
                var a = -$("#pages #page-" + f[g - 1].page_url).position().left;
                $("#pages").css({
                    "-webkit-transition": "all .25s ease-in",
                    "-moz-transition": "all .25s ease-in",
                    "-o-transition": "all .25s ease-in",
                    transition: "all .25s ease-in",
                    "-webkit-transform": "translate3d(" + a + "px, 0, 0)",
                    "-moz-transform": "translate3d(" + a + "px, 0, 0)",
                    "-o-transform": "translate3d(" + a + "px, 0, 0)",
                    transform: "translate3d(" + a + "px, 0, 0)"
                })
            }, 250);
            return false
        }
        if (a == "prev") {
            c = "prev";
            var b = -$("#pages #page-" + f[g - 1].page_url).position().left + $(window).width();
            $("#pages").css({
                "-webkit-transition": "all .5s ease-out",
                "-moz-transition": "all .5s ease-out",
                "-o-transition": "all .5s ease-out",
                transition: "all .5s ease-out",
                "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                "-o-transform": "translate3d(" + b + "px, 0, 0)",
                transform: "translate3d(" + b + "px, 0, 0)"
            });
            var d = f[g - 2].page_name,
                e = siteUrl + f[g - 2].chapter_url + "/" + f[g - 2].page_url,
                h = {
                    direction: c,
                    currentPageOverall: g - 1
                }
        }
        if (a == "next") {
            c = "next";
            var b = -$("#pages #page-" + f[g - 1].page_url).position().left - $(window).width();
            $("#pages").css({
                "-webkit-transition": "all .5s ease-out",
                "-moz-transition": "all .5s ease-out",
                "-o-transition": "all .5s ease-out",
                transition: "all .5s ease-out",
                "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                "-o-transform": "translate3d(" + b + "px, 0, 0)",
                transform: "translate3d(" + b + "px, 0, 0)"
            });
            var d = f[g].page_name,
                e = siteUrl + f[g].chapter_url + "/" + f[g].page_url,
                h = {
                    direction: c,
                    currentPageOverall: g + 1
                }
        }
        setTimeout(function () {
            r()
        }, 500);
        window.history.pushState(h, d, e);
        t()
    }
    function o(a) {
        if (!a.currentPageOverall) {
            a.currentPageOverall = h
        }
        if (d == true) {
            if (g > a.currentPageOverall) {
                c = "prev";
                var b = -$("#pages #page-" + f[g - 1].page_url).position().left + $(window).width();
                $("#pages").css({
                    "-webkit-transform": "",
                    "-moz-transform": "",
                    "-o-transform": "",
                    transform: "",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: "",
                    "-webkit-animation": "",
                    "-moz-animation": "",
                    "-o-animation": "",
                    animation: "",
                    "-webkit-transition": "all .5s",
                    "-moz-transition": "all .5s",
                    "-o-transition": "all .5s",
                    transition: "all .5s",
                    "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                    "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                    "-o-transform": "translate3d(" + b + "px, 0, 0)",
                    transform: "translate3d(" + b + "px, 0, 0)"
                })
            }
            if (g < a.currentPageOverall) {
                c = "next";
                var b = -$("#pages #page-" + f[g - 1].page_url).position().left - $(window).width();
                $("#pages").css({
                    "-webkit-transform": "",
                    "-moz-transform": "",
                    "-o-transform": "",
                    transform: "",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: "",
                    "-webkit-animation": "",
                    "-moz-animation": "",
                    "-o-animation": "",
                    animation: "",
                    "-webkit-transition": "all .5s",
                    "-moz-transition": "all .5s",
                    "-o-transition": "all .5s",
                    transition: "all .5s",
                    "-webkit-transform": "translate3d(" + b + "px, 0, 0)",
                    "-moz-transform": "translate3d(" + b + "px, 0, 0)",
                    "-o-transform": "translate3d(" + b + "px, 0, 0)",
                    transform: "translate3d(" + b + "px, 0, 0)"
                })
            }
            setTimeout(function () {
                $("#pages").css({
                    "-webkit-transform": "all 0s",
                    "-moz-transform": "all 0s",
                    "-o-transform": "all 0s",
                    transform: "all 0s"
                });
                r()
            }, 500);
            t()
        }
    }
    function a(a) {
        if (a.target.id == "blocker") {
            a.preventDefault()
        }
    }
    window.bugit = function (a, b) {
        b = typeof b != "undefined" ? b : false;
        if (b == true) {
            $("#debug").append(a + " / ")
        } else {
            $("#debug").html(a)
        }
    };
    $(".add-right").click(function (a) {
        a.preventDefault();
        s("end")
    });
    $(".add-left").click(function (a) {
        a.preventDefault();
        s("beg")
    });
    $(".page-pos").click(function (a) {
        a.preventDefault();
        var b = $("#pages").position().left;
        console.log(b)
    });
    $(".next").click(function (a) {
        a.preventDefault();
        nextPage()
    });
    $(".prev").click(function (a) {
        a.preventDefault();
        prevPage()
    });
    $(".kill").click(function (a) {
        a.preventDefault();
        window.nextPage = function () {};
        window.prevPage = function () {};
        window.repo = function () {};
        window.my_repo = function () {}
    });
    window.onorientationchange = function () {
        $("body").scrollLeft(0);
        if ($(".current").height() + ($(".current").position().top - $(window).height()) < 0) {
            $(".current").css({
                "-webkit-transform": "",
                "-webkit-transition": "",
                "-webkit-animation": ""
            }).css("webkitTransform", "translate3d(0, " + ($(window).height() - $(".current").height()) + "px, 0)")
        }
        r()
    };
    window.addEventListener(typeof isTouch !== "undefined" && isTouch ? "touchstart" : "mousedown", a, false);
    keypressed = false;
    $(document).bind("keydown.right", function () {
        if (keypressed == false) {
            p("next");
            keypressed = true
        }
        return false
    });
    $(document).bind("keyup.right", function () {
        setTimeout(function () {
            keypressed = false
        }, 800);
        return false
    });
    $(document).bind("keydown.left", function () {
        if (keypressed == false && $(".current").hasClass("scrollable")) {
            p("prev");
            keypressed = true
        }
        return false
    });
    $(document).bind("keyup.left", function () {
        setTimeout(function () {
            keypressed = false
        }, 800);
        return false
    });
    $(document).bind("keydown.down", function (a) {
        a.preventDefault();
        if (keypressed == false && $(".current").hasClass("scrollable")) {
            $("article.current").animate({
                scrollTop: $("article.current").scrollTop() + 250
            }, {
                duration: 200,
                easing: "swing"
            });
            keypressed = true
        }
        return false
    });
    $(document).bind("keyup.down", function (a) {
        a.preventDefault();
        keypressed = false;
        return false
    });
    $(document).bind("keydown.up", function (a) {
        a.preventDefault();
        if (keypressed == false) {
            $("article.current").animate({
                scrollTop: $("article.current").scrollTop() - 250
            }, {
                duration: 200,
                easing: "swing"
            });
            keypressed = true
        }
        return false
    });
    $(document).bind("keyup.up", function (a) {
        a.preventDefault();
        keypressed = false;
        return false
    });
    extraPages = 1;
    var b = navigator.userAgent.toLowerCase();
    var c = false;
    var d = true;
    var e = false;
    var f = new Array;
    var g = 0;
    var h = 0;
    var j = new Object;
    var k = false;
    var l = {
        data: {
            direction: c,
            currentPageOverall: g
        },
        title: "",
        url: location.href
    };
    var m = "state" in window.history,
        n = location.href;
    window.addEventListener("popstate", function (a) {
        var b = !m && location.href == n;
        m = true;
        if (b) return;
        var c = a.state;
        if (c) {
            o(c)
        }
    });
    q();
    window.my_repo = r;
    window.nextPage = function () {
        c = "next";
        d = false;
        t();
        setTimeout(function () {
            r()
        }, 500)
    };
    window.prevPage = function () {
        c = "prev";
        d = false;
        t();
        setTimeout(function () {
            r()
        }, 500)
    }
})