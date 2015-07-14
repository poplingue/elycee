define('publicWindow', function(){

	var publicWindow = {

		init: function init(){

			var body = $('body');

			if (body.hasClass('public-window home')) {
				$('.sub-menu').eq(1).find('a').addClass('active');
			}
			else if(body.hasClass('public-window estate')){
				$('.sub-menu').eq(2).find('a').addClass('active');
			}
			else if(body.hasClass('public-window contact')){
				$('.sub-menu').eq(3).find('a').addClass('active');
			}
		}
	};
	return publicWindow;
});
