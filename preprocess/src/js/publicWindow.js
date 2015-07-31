define('publicWindow', function(){

	var publicWindow = {

		init: function init(){
			this.listActiv();
			this.ajaxContact();
		},

		listActiv: function listActiv(){
			var body = $('body');

			if (body.hasClass('public-window')) {
				$('.dash-menu').remove();
			}
			if (body.hasClass('home')) {
				$('.public-menu').first().find('a').addClass('active');
			}
			else if(body.hasClass('estate')){
				$('.sidebar-menu').find('li:eq(1)').find('a').addClass('active');
			}
			else if(body.hasClass('contact')){
				$('.sidebar-menu').find('li:eq(2)').find('a').addClass('active');
			}
		},

		ajaxContact: function contact(){

			$('.form-contact').data('beforesend', function() {
				$('.loading').addClass('on').removeClass('off');
			});

			$('.form-contact').data('onsuccess', function() {
		        $.ajax({
		        	method: 'POST',
		        	url: Routing.generate('splj.window.contact-save'),            
		            data:  $('.form-contact').serializeArray(),
		            success: function(data){
		            	$('.loading').addClass('off').removeClass('on');
		            	$('.centered').addClass('w100');
		            	$('.form-contact').remove();
		            	$('.centered').append('<p>Merci '+ data.name +'. Votre message a été envoyé !</p>');
		            },
		            error: function(error){
		            	$('.loading').addClass('off').removeClass('on');
		            	$('.centered').addClass('w100');
		            	$('.form-contact').remove();
		            	$('.centered').append('<div class="error-js"><p class="error">Une erreur est survenue. Tu sais pas compter ?!</p><div>');
		            	
		            	
		            }
	        	});   
			});
		},
	};
	return publicWindow;
});
