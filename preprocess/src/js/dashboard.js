define('dashboard', function(){

	var dashboard = {

		init: function init() {

		    var body = $('body');
	    	if (body.hasClass('dashboard')) {
	    		$('.wrap-logo img').attr('src','/bundles/splj/img/logo_60_yellow.jpg');
	    	}
	    	if (body.hasClass('qcm')) {
	    		$('.sub-menu').eq(5).find('a').addClass('active');

	    	}else if(body.hasClass('article')){
	    		$('.sub-menu').eq(6).find('a').addClass('active');

	    	}
	    }
	};
	return dashboard;
});
