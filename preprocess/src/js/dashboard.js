define('dashboard', function(){


	var dashboard = {
		
		init: function init(){
			this.customMenu();
			this.checkForm();
		},

		customMenu: function customMenu() {
	    	var body = $('body');

			if (body.hasClass('dashboard')) {
				$('.public-menu').remove();
			}
	    	if (body.hasClass('dashboard')) {
	    		$('.wrap-logo img').attr('src','/bundles/splj/img/logo_60_grey.jpg');
	    		$('#main-content .col-lg-3').remove();
	    		$('#main-content .col-lg-9').removeClass().addClass('col-lg-12 main-chart');

	    	}
	    	if (body.hasClass('qcm')) {
	    		$('.dash-menu').eq(1).find('a').addClass('active');

	    	}else if(body.hasClass('article')){
	    		$('.dash-menu').eq(2).find('a').addClass('active');
	    	
	    	}else if(body.hasClass('stats')){
	    		$('.dash-menu').last().find('a').addClass('active');
	    	}
	    },

	    checkForm: function checkForm(){
	    	// $('#form').checkForm();
	    }

	};
	return dashboard;
});
