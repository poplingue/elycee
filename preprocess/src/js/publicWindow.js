define('publicWindow', function(){

	var publicWindow = {

		init: function init(){
			this.listActiv();
			this.ajaxContact();
			this.ajaxSearch();
			if ($('.main-chart p').length !== 0) {
				this.articleStyle();
			}
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

		ajaxSearch: function ajaxSearch(){

			$('.form-search').data('beforesend', function() {
				$('.loading').addClass('on').removeClass('off');
			});

			$('.form-search').data('onsuccess', function() {
		        $.ajax({
		        	method: 'POST',
		        	url: Routing.generate('splj.window.go-search'),            
		            data:  $('.form-search').serializeArray(),
		            success: function(data){
			            $('.loading').addClass('off').removeClass('on');
		            	if (data.length !== 0) {
			            	$('.wrap-list').empty();
			            	$.each(data, function(key,value){
			            		$('.wrap-list').append('<div class="col-md-6 col-sm-6 mb">'+
			            			'<li class="article white-panel pn donut-chart">'+
			            				'<div class="white-header">'+
			            				'<h3><a href="/home/article/'+value.id+'">'+value.title+'</a></h3>'+
			            				'</div>'+
			            				'<div class="text-left"><div class="infos"><span>publié le </span>'+
			            				'<date>'+value.date+'</date></span></div>'+
			            				'<div class="text-solo">'+value.extract+'<a href="/home/article/'+value.id+'">...Lire la suite</a></div>'+
			            			'</li></div>');
						    });  
		            	}else{
			            	$('.wrap-list').empty();
		            		$('.wrap-list').append('<p>Aucun article correspondant</p>');
		            	}
		            },
		            error: function(error){
			            $('.loading').addClass('off').removeClass('on');
		            	$('.wrap-list').append('<p>Une erreur est survenue</p>');
		            }
	        	});   
			});
		}, 

		articleStyle: function articleStyle(){
			console.log('test');
			var paragraph = $('p');
  			paragraph.html(paragraph.html().replace(/<br>/ig, '</p><p>'));
		}
	};
	return publicWindow;
});
