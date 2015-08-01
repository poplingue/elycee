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
    $("#sidebar").hide();
    $(".fa-bars").click(function() {
        if ($("#sidebar > ul").is(":visible") === true) {
            $("#main-content").css({
                "margin-left": "0px"
            });
            $("#sidebar").hide();
            $("#sidebar > ul").hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $("#sidebar > ul").show();
            $("#sidebar").show();
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
            this.customPaginator();
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
        checkForm: function checkForm() {
            $("form").validateForm();
            $('form[name="article"]').data("check", function() {
                var form = this;
                var isValid = true;
                var dateReg = /^\d{2}([./])\d{2}\1\d{4}$/;
                if (!$("#article_date").val().match(dateReg)) {
                    isValid = false;
                    $('form[name="article"]').data("ValidateForm").applyError($("#article_date")[0]);
                }
                return isValid;
            });
            // which side of website
            if (".dashboard") {
                $("form").after('<span class="error-js"></span>');
            } else {
                $("form").before('<span class="bottom-form error-js"></span>');
            }
            // remove border input
            $("input, select, textarea").on("click", function() {
                if ($(this).is(".error")) {
                    $(this).removeClass("error");
                }
            });
            // on error 
            $("input, select, textarea").on("error", function() {
                $(".error-js").append('<p class="centered error">Le champ ' + $(this).attr("data-error") + " est obligatoire</p>");
                setTimeout(function() {
                    $(".error-js").empty();
                }, 2e3);
            });
        },
        customPaginator: function customPaginator() {
            var pagination = $(".pagination");
            pagination.find(".first a").html('<i class="fa fa-fast-backward"></i>');
            pagination.find(".last a").html('<i class="fa fa-fast-forward"></i>');
            pagination.find(".next a").html('<i class="fa fa-forward"></i>');
            pagination.find(".previous a").html('<i class="fa fa-backward"></i>');
        }
    };
    return dashboard;
});

define("main", [ "publicWindow", "dashboard" ], function(publicWindow, dashboard) {
    dashboard.init();
    publicWindow.init();
    // modal
    $(".btn-danger a").confirm();
    // datepicker
    $(function() {
        $(".datepicker").datepicker($.datepicker.regional["fr"]);
    });
});

define("publicWindow", function() {
    var publicWindow = {
        init: function init() {
            this.listActiv();
            this.ajaxContact();
            this.ajaxSearch();
            if ($(".main-chart p").length !== 0) {
                this.articleStyle();
            }
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
        },
        ajaxContact: function contact() {
            $(".form-contact").data("beforesend", function() {
                $(".loading").addClass("on").removeClass("off");
            });
            $(".form-contact").data("onsuccess", function() {
                $.ajax({
                    method: "POST",
                    url: Routing.generate("splj.window.contact-save"),
                    data: $(".form-contact").serializeArray(),
                    success: function(data) {
                        $(".loading").addClass("off").removeClass("on");
                        $(".centered").addClass("w100");
                        $(".form-contact").remove();
                        $(".centered").append("<p>Merci " + data.name + ". Votre message a été envoyé !</p>");
                    },
                    error: function(error) {
                        $(".loading").addClass("off").removeClass("on");
                        $(".centered").addClass("w100");
                        $(".form-contact").remove();
                        $(".centered").append('<div class="error-js"><p class="error">Une erreur est survenue. Tu sais pas compter ?!</p><div>');
                    }
                });
            });
        },
        ajaxSearch: function ajaxSearch() {
            $(".form-search").data("beforesend", function() {
                $(".loading").addClass("on").removeClass("off");
            });
            $(".form-search").data("onsuccess", function() {
                $.ajax({
                    method: "POST",
                    url: Routing.generate("splj.window.go-search"),
                    data: $(".form-search").serializeArray(),
                    success: function(data) {
                        $(".loading").addClass("off").removeClass("on");
                        if (data.length !== 0) {
                            $(".wrap-list").empty();
                            $.each(data, function(key, value) {
                                $(".wrap-list").append('<div class="col-md-6 col-sm-6 mb">' + '<li class="article white-panel pn donut-chart">' + '<div class="white-header">' + '<h3><a href="/home/article/' + value.id + '">' + value.title + "</a></h3>" + "</div>" + '<div class="text-left"><div class="infos"><span>publié le </span>' + "<date>" + value.date + "</date></span></div>" + '<div class="text-solo">' + value.extract + '<a href="/home/article/' + value.id + '">...Lire la suite</a></div>' + "</li></div>");
                            });
                        } else {
                            $(".wrap-list").empty();
                            $(".wrap-list").append("<p>Aucun article correspondant</p>");
                        }
                    },
                    error: function(error) {
                        $(".loading").addClass("off").removeClass("on");
                        $(".wrap-list").append("<p>Une erreur est survenue</p>");
                    }
                });
            });
        },
        articleStyle: function articleStyle() {
            console.log("test");
            var paragraph = $("p");
            paragraph.html(paragraph.html().replace(/<br>/gi, "</p><p>"));
        }
    };
    return publicWindow;
});
//# sourceMappingURL=app.js.map