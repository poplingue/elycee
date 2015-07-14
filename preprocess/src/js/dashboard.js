define('dashboard', function(){

	var dashboard = {

		init: function init() {

		    var body = $('body');
	    	if (body.hasClass('dashboard')) {
	    		$('.wrap-logo img').attr('src','/bundles/splj/img/logo_60_yellow.jpg');
	    		$('#main-content .col-lg-3').remove();
	    		$('#main-content .col-lg-9').removeClass().addClass('col-lg-12 main-chart');

	    	}
	    	if (body.hasClass('qcm')) {
	    		$('.sub-menu').eq(5).find('a').addClass('active');

	    	}else if(body.hasClass('article')){
	    		$('.sub-menu').eq(6).find('a').addClass('active');
	    	
	    	}else if(body.hasClass('stats')){
	    		$('.sub-menu').eq(7).find('a').addClass('active');
	    	}
	    }
	};
	return dashboard;
});
