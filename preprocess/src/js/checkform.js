(function($) {
    $.fn.checkForm = function(opt) {

        var App = function(opt,form) {

        	App = this,

        	opt = $.extend({
        	    form: '',
        	    className: 'input[data-check],textarea[data-check]',
        	    parent: '.container-input'
        	}, App.opt),        	

        	$form = (typeof opt.form == 'undefined' || opt.form == '') ? $(form) : $(opt.form),

        	init = function($form) {
                console.log('start check');
        		this.startCheck($form);

        		if($form.find('.has-error').length > 0) {
        			return {
        				'response': false,
        				'message': 'messaggio errore',
        				'errors': {
        					'00': 'errore 0',
        					'01': 'errore 1'
        				}
        			};
        		}else {
        			return {
        				'response': true,
        				'message': 'invio in corso',
        				'errors': {
        					'00': 'errore 0',
        					'01': 'errore 1'
        				}
        			};
        		}
        	},

        	mainCheck = function($input,type) {
        		var _errorCount = 0;
        		switch (type) {
        			case ('required'): {
        				_errorCount = _errorCount + App.requiredCheck($input);
        			};break;
        			case ('cap'): {
        				_errorCount = _errorCount + App.capCheck($input);
        			};break;
        			case ('email'): {
        				_errorCount = _errorCount + App.emailCheck($input);
        			};break;
        			case ('phone'): {
        				_errorCount = _errorCount + App.phoneCheck($input);
        			};break;
        			/*case ('oneAtLeast'): {
        				_errorCount = _errorCount + App.oneAtLeastCheck($input);
        			};break;*/
        			default:{console.log(type)};
        		}
        		return _errorCount;
        	},

        	startCheck = function($form) {
        		$form.find(opt.className).each(function(index,item) {
        			var typeArray = $(item).data('check').split(',');
        			var _errorCount = 0;
        			$.each(typeArray,function(index,type) {
        				_errorCount = _errorCount + App.mainCheck($(item),type);
        			});
        			if(_errorCount == 0) {
        				App.addSuccess($(item));
        			}else {
        				App.addError($(item));
        			}
        		});
        	},

        	requiredCheck = function($input) {
        		var _val = $input.val();
        		if(_val == '') {
        			return 1;
        		}else {
        			return 0;
        		}
        	},

        	capCheck = function($input) {
        		var _val = $input.val();
        		if(_val.length != 5) {
        			return 1;
        		}else {
        			return 0;
        		}
        	},

        	emailCheck = function($input) {
        		var _val = $input.val();
        		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        		if(pattern.test(_val) == false) {
        			return 1;
        		}else {
        			return 0;
        		}
        	},

        	phoneCheck = function($input) {
        		var _val = $input.val();
        		var pattern = new RegExp(/^([+]39)?((38[{8,9}|0])|(34[{7-9}|0])|(36[6|8|0])|(33[{3-9}|0])|(32[{8,9}]))([\d]{7})$/);
        		if(pattern.test(_val) == false) {
        			return 1;
        		}else {
        			return 0;
        		}
        	},

        	oneAtLeastCheck = function($input) {
        		var _val = $input.val();
        		var _name = $input.data('checkname');
        		$form.find('[data-checkname="'+_name+'"]').each(function(index,item) {
        			if($(item).is(':checked')) {
        				//console.log('si');
        			}else {
        				//console.log('no');
        			}
        		});
        	}

        	addError = function($input) {
        		$input.closest(opt.parent).addClass('has-error');
        		$input.on('focus',function(){
        			$(this).closest(opt.parent).removeClass('has-error');
        		});
        	},

        	addSuccess = function($input) {
        		$input.closest(opt.parent).addClass('has-success');
        	},

        	removeError = function($input) {
        		$input.closest(opt.parent).removeClass('has-error');
        	}
        	
        	return this.init($form);
        }

        return App(opt,this);

    };
})(jQuery);