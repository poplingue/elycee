/*---LEFT BAR ACCORDION----*/
$(function() {
    $("#nav-accordion").dcAccordion({
        eventType: "click",
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: "slow",
        showCount: false,
        autoExpand: true,
        //        cookie: 'dcjq-accordion-1',
        classExpand: "dcjq-current-parent"
    });
});

var Script = function() {
    //    sidebar dropdown menu auto scrolling
    jQuery("#sidebar .sub-menu > a").click(function() {
        var o = $(this).offset();
        diff = 250 - o.top;
        if (diff > 0) $("#sidebar").scrollTo("-=" + Math.abs(diff), 500); else $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
    });
    //    sidebar toggle
    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $("#container").addClass("sidebar-close");
                $("#sidebar > ul").hide();
            }
            if (wSize > 768) {
                $("#container").removeClass("sidebar-close");
                $("#sidebar > ul").show();
            }
        }
        $(window).on("load", responsiveView);
        $(window).on("resize", responsiveView);
    });
    $(".fa-bars").click(function() {
        if ($("#sidebar > ul").is(":visible") === true) {
            $("#main-content").css({
                "margin-left": "0px"
            });
            $("#sidebar").css({
                "margin-left": "-210px"
            });
            $("#sidebar > ul").hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $("#main-content").css({
                "margin-left": "210px"
            });
            $("#sidebar > ul").show();
            $("#sidebar").css({
                "margin-left": "0"
            });
            $("#container").removeClass("sidebar-closed");
        }
    });
    // custom scrollbar
    $("#sidebar").niceScroll({
        styler: "fb",
        cursorcolor: "#9966FF",
        cursorwidth: "2",
        cursorborderradius: "10px",
        background: "#666666",
        spacebarenabled: false,
        cursorborder: ""
    });
    $("html").niceScroll({
        styler: "fb",
        cursorcolor: "#9966FF",
        cursorwidth: "4",
        cursorborderradius: "10px",
        background: "#666666",
        spacebarenabled: false,
        cursorborder: "",
        zindex: "1000"
    });
    // widget tools
    jQuery(".panel .tools .fa-chevron-down").click(function() {
        var el = jQuery(this).parents(".panel").children(".panel-body");
        if (jQuery(this).hasClass("fa-chevron-down")) {
            jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });
    jQuery(".panel .tools .fa-times").click(function() {
        jQuery(this).parents(".panel").parent().remove();
    });
    //    tool tips
    $(".tooltips").tooltip();
    //    popovers
    $(".popovers").popover();
    // custom bar chart
    if ($(".custom-bar-chart")) {
        $(".bar").each(function() {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2e3);
        });
    }
}();

define("dashboard", function() {
    var dashboard = {
        init: function init() {
            this.customMenu();
            this.checkForm();
        },
        customMenu: function customMenu() {
            var body = $("body");
            if (body.hasClass("dashboard")) {
                $(".public-menu").remove();
            }
            if (body.hasClass("dashboard")) {
                $(".wrap-logo img").attr("src", "/bundles/splj/img/logo_60_grey.jpg");
                $("#main-content .col-lg-3").remove();
                $("#main-content .col-lg-9").removeClass().addClass("col-lg-12 main-chart");
            }
            if (body.hasClass("qcm")) {
                $(".dash-menu").eq(1).find("a").addClass("active");
            } else if (body.hasClass("article")) {
                $(".dash-menu").eq(2).find("a").addClass("active");
            } else if (body.hasClass("stats")) {
                $(".dash-menu").last().find("a").addClass("active");
            }
        },
        checkForm: function checkForm() {}
    };
    return dashboard;
});

define("main", [ "publicWindow", "dashboard" ], function(publicWindow, dashboard) {
    dashboard.init();
    publicWindow.init();
});

define("publicWindow", function() {
    var publicWindow = {
        init: function init() {
            this.listActiv();
        },
        listActiv: function listActiv() {
            var body = $("body");
            if (body.hasClass("public-window")) {
                $(".dash-menu").remove();
            }
            if (body.hasClass("home")) {
                $(".public-menu").first().find("a").addClass("active");
            } else if (body.hasClass("estate")) {
                $(".sidebar-menu").find("li:eq(1)").find("a").addClass("active");
            } else if (body.hasClass("contact")) {
                $(".sidebar-menu").find("li:eq(2)").find("a").addClass("active");
            }
        }
    };
    return publicWindow;
});
//# sourceMappingURL=app.js.map