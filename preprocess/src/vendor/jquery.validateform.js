/**!
 * jQuery Validate Form Plugin v2.0 - checkValidity, required, email, number, pattern, time, url, ajaxSubmit
 * @author: Clément Caillard
 *
 * Bang bang bang !
 */

//DO NOT ADD type="date" : impossible de simuler le comportement natif

(function($, global) {
   
    var ValidateForm = (function() {
        
        function ValidateForm(form) { 
            var self = this;
            this.supportCheckValidity = (typeof document.createElement('form').checkValidity === 'function');
                        
            $(form).on('submit', function() {
                var $form   = $(this),
                    isValid = self.checkValidity(this);
                
                if (typeof $form.data('check') === 'function') {
                    isValid = $form.data('check').call(this) && isValid;
                }
  
                if (!isValid) {
                    $form.find('.error-validation').show();
                    
                    if (typeof $form.data('onerrorvalidation') === 'function') {
                        $form.data('onerrorvalidation').call(this);
                    }
                }
                
                if (isValid) {
                    if ($form.attr('data-ajax')) {
                        self.ajaxSubmit($form.attr('action'), $form.attr('method'), this);
                    } else {
                        if (typeof $form.data('onsuccess') === 'function') { 
                            $form.data('onsuccess').call(self);
                        } 
                    }
                }
                
                return (isValid && !$form.attr('data-ajax'));
            });
        }
        
        ValidateForm.prototype = {
            
            checkValidity: function(form) {  
                var self    = this,
                    $form   = $(form),
                    isValid = true;
    
                $form.find('.error-validation').hide();
                $form.find('.error').removeClass('error');
                
                if (this.supportCheckValidity) {
                    isValid = form.checkValidity();
                    
                    if (!isValid) {
                        $form.find(':invalid').each(function() {
                            self.applyError(this);
                        });
                    }
                } else {
                    $form.find('[required]:enabled').each(function() {
                        var $input = $(this);
                        
                        // if ($input.val() === "" || ($input.is('input[type=checkbox]') && !$input.is(':checked'))) {
                        //     isValid = false;
                        //     self.applyError(this);
                        // }
                    });
                    
                    $form.find('input[type=email]:enabled').each(function() {
                        var $input = $(this);

                        if ($input.val() !== "" && !self.validEmail($input.val())) {
                            isValid = false;
                            self.applyError(this);
                        }
                    });
    
                    $form.find('input[pattern]:enabled').each(function() {
                        var $input = $(this);
                        
                        if ($input.val() !== "" && !self.validRegExp($input.val(), $input.attr('pattern'))) {
                            isValid = false;
                            self.applyError(this);
                        }
                    });
                    
                    $form.find('input[type=time]:enabled').each(function() {
                        var $input = $(this);
                        
                        if ($input.val() !== "" && !self.validTime($input.val())) {
                            isValid = false;
                            self.applyError(this);
                        }
                    });
                    
                    $form.find('input[type=number]:enabled').each(function() {
                        var $input = $(this);
                        
                        if ($input.val() !== "" && isNaN($input.val())) {
                            isValid = false;
                            self.applyError(this);
                        }
                    });
                    
                    $form.find('input[type=url]:enabled').each(function() {
                        var $input = $(this);
                        
                        if ($input.val() !== "" && !self.validURL($input.val())) {
                            isValid = false;
                            self.applyError(this);
                        }
                    });
                }
                
                return isValid;
            },
            
            validRegExp: function(val, reg) {
                var regExp = new RegExp(reg);
                return regExp.test(val);
            },
            
            validEmail: function(email) {
                return this.validRegExp(email, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            },
            
            validDate: function(time) {
                return this.validRegExp(time, /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
            },

            validURL: function(url) {
                return this.validRegExp(url, /^(https?|ftp|file):\/\/.+$/);
            },
            
            applyError: function(field) {
                var $field = $(field);
                $field.addClass('error').trigger('error');
                $('label[for=' + $field.attr('id') + ']').addClass('error');
                //TODO afficher un message personnalisé (se baser sur un id du genre formvalidation-id-error-message)
            },
            
            ajaxSubmit: function(url, type, form) {
                var self  = form,
                    $form = $(form);
                
                $.ajax({
                    url: url,
                    type: type,
                    data: $form.serialize(),
                    //crossDomain: true,
                    beforeSend: function(data, settings) {
                        if (typeof $form.data('beforesend') === 'function') {
                            $form.data('beforesend').call(self);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        if (typeof  $form.data('onerror') === 'function') {
                            $form.data('onerror').call(self, errorThrown);
                         }
                    },
                    success: function(data, textStatus, jqXHR) {
                        if (typeof $form.data('onsuccess') === 'function') { 
                            $form.data('onsuccess').call(self, data);
                        } 
                    }
                });
            }
        };
        
        return ValidateForm;
    })();

    $.fn.validateForm = function() {
        return this.each(function() { 
          var $self = $(this);
          if ($self.data('ValidateForm')) return;
          var instance = new ValidateForm(this);
          $self.data('ValidateForm', instance);
        });
    }
    
})(jQuery, window);
