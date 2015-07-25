/* ---------------------------------- */
/* CheckForm */
(function($) {
    var CheckForm = function() {
        function CheckForm(cntx) {
            var self = this, $form = $(cntx);
            this.form = $form;
            $form.submit(function(e) {
                var returnValue = self.check(this);
                var isValidCallBack = true;
                if ($(this).data("check")) {
                    console.log("check");
                    isValidCallBack = $(this).data("check")();
                }
                if (!(returnValue["isValid"] && isValidCallBack)) {
                    console.log("!valid");
                    $(document).trigger("FORM_ERROR", [ {
                        form: $form,
                        ajax: $(this).data("submit") == "ajax" ? true : false,
                        status: returnValue["statusError"]
                    } ]);
                }
                if (returnValue["isValid"] && isValidCallBack) {
                    $(document).trigger("FORM_VALID", [ {
                        form: $form,
                        ajax: $(this).data("submit") == "ajax" ? true : false
                    } ]);
                    return false;
                }
                return returnValue["isValid"] && isValidCallBack;
            });
        }
        CheckForm.prototype = {
            check: function(formElmt) {
                var self = this, returnValue = [], $form = $(formElmt);
                returnValue["isValid"] = true, returnValue["statusError"] = undefined;
                $form.find(".form-item, label, input, select, textarea").removeClass("error");
                $form.find("input:visible").each(function() {
                    if (!$(this).is("label") && !$(this).is("input[type=checkbox]")) {
                        if ($(this).val() == "" || $(this).val() == $(this).attr("placeholder")) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "empty";
                            self.applyError(this);
                        }
                    }
                });
                $form.find("input[type=checkbox].required:visible").each(function() {
                    if (!$(this).is(":checked")) {
                        returnValue["isValid"] = false;
                        returnValue["statusError"] = "empty";
                        self.applyError(this);
                    }
                });
                $form.find("input[data-type=confirm]:visible").each(function() {
                    if ($(this).val() != $($(this).data("ref")).val()) {
                        returnValue["isValid"] = false;
                        returnValue["statusError"] = "invalid";
                        self.applyError(this);
                    }
                });
                $form.find("input[data-type=email]:visible").each(function() {
                    if ($(this).val() != "" && $(this).val() != $(this).attr("placeholder")) {
                        if (!self.validEmail($(this).val())) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "invalid";
                            self.applyError(this);
                        }
                    }
                });
                $form.find("input[data-regexp]:visible").each(function() {
                    var value = $(this).val();
                    if (value != "" && value != $(this).attr("placeholder")) {
                        if (!self.validRegExp(value, $(this).data("regexp"))) {
                            returnValue["isValid"] = false;
                            returnValue["statusError"] = "invalid";
                            self.applyError(this);
                        }
                    }
                });
                return returnValue;
            },
            validRegExp: function(val, reg) {
                var regExp = new RegExp(reg);
                return val.match(regExp);
            },
            validEmail: function(email) {
                var mailExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return email.match(mailExp);
            },
            applyError: function(elmt) {
                console.log("error");
                $(elmt).addClass("error").closest(".form-item").addClass("error");
                if ($(elmt).data("error")) {
                    App.log($(elmt).data("error"));
                    $($(elmt).data("error")).show();
                }
                $("label[for=" + $(elmt).attr("id") + "]").addClass("error");
            },
            ajaxSubmit: function(elmt, urlAjax, typeAjax, objAjax) {
                console.log("ajax");
                var $this = $(elmt), self = elmt;
                $.ajax({
                    url: urlAjax,
                    type: typeAjax,
                    data: objAjax.serialize(),
                    success: function(data, textStatus, XMLHttpRequest) {
                        if ($this.data("success")) {
                            $this.data("success").call(self, data);
                        }
                    }
                });
            }
        };
        return CheckForm;
    }();
    $.fn.checkForm = function() {
        var pluginName = "CheckForm";
        return this.each(function() {
            var $self = $(this);
            if ($self.data(pluginName)) return;
            var instance = new CheckForm(this);
            $self.data(pluginName, instance);
        });
    };
})(jQuery);

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
            this.questionsMore();
            this.customMenu();
            this.checkForm();
        },
        customMenu: function customMenu() {
            var body = $("body");
            if (body.hasClass("dashboard")) {
                $(".wrap-logo img").attr("src", "/bundles/splj/img/logo_60_grey.jpg");
                $("#main-content .col-lg-3").remove();
                $("#main-content .col-lg-9").removeClass().addClass("col-lg-12 main-chart");
            }
            if (body.hasClass("qcm")) {
                $(".dash-menu").eq(2).find("a").addClass("active");
            } else if (body.hasClass("article")) {
                $(".dash-menu").eq(3).find("a").addClass("active");
            } else if (body.hasClass("stats")) {
                $(".dash-menu").eq(4).find("a").addClass("active");
            }
        },
        checkForm: function checkForm() {},
        questionsMore: function questionsMore() {}
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
            var body = $("body");
            if (body.hasClass("public-window home")) {
                $(".public-menu").eq(1).find("a").addClass("active");
            } else if (body.hasClass("public-window estate")) {
                $(".public-menu").eq(2).find("a").addClass("active");
            } else if (body.hasClass("public-window contact")) {
                $(".public-menu").eq(3).find("a").addClass("active");
            }
        }
    };
    return publicWindow;
});
//# sourceMappingURL=app.js.map