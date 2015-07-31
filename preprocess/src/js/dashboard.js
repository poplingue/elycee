define('dashboard', function(){


	var dashboard = {
		
		init: function init(){
			this.customMenu();
			this.checkForm();
			this.customPaginator();
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
			$('form').validateForm();

			$('form[name="article"]').data('check', function() {
				var form = this;
				var isValid = true;
				var dateReg = /^\d{2}([./])\d{2}\1\d{4}$/;

				if (!$('#article_date').val().match(dateReg)) {
					isValid = false;
					$('form[name="article"]').data('ValidateForm').applyError($('#article_date')[0]);
				}

				return isValid;
			});

			// which side of website
			if ('.dashboard') {
				$('form').after('<span class="error-js"></span>');
			}else{
				$('form').before('<span class="bottom-form error-js"></span>');
			}
			// remove border input
			$('input, select, textarea').on('click', function(){
				if ($(this).is('.error')) {
					$(this).removeClass('error');
				}
			});
			// on error 
			$('input, select, textarea').on('error', function() {
				$('.error-js').append('<p class="centered error">Le champ ' + $(this).attr('data-error') + ' est obligatoire</p>');
				setTimeout(function(){
					$('.error-js').empty();
				},2000);
			});
		},

		customPaginator: function customPaginator(){
			var pagination = $('.pagination');
			pagination.find('.first a').html('<i class="fa fa-fast-backward"></i>');
			pagination.find('.last a').html('<i class="fa fa-fast-forward"></i>');
			pagination.find('.next a').html('<i class="fa fa-forward"></i>');
			pagination.find('.previous a').html('<i class="fa fa-backward"></i>');
		}
	};
	return dashboard;
});
