define('main',['publicWindow','dashboard'], function(publicWindow, dashboard) {

    dashboard.init();
    publicWindow.init();

    // modal
    $('.btn-danger a').confirm();

    // datepicker
	$(function() {
		$( ".datepicker" ).datepicker($.datepicker.regional[ "fr" ]);
	});
});
