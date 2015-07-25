define('publicWindow', function(){

	var publicWindow = {

		init: function init(){
			this.listActiv();
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
		}
	};
	return publicWindow;
});
