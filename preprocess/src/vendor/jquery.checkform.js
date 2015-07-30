/* ---------------------------------- */

/* CheckForm */


(function($) {
    var CheckForm = (function(){

        function CheckForm(cntx){
            var self = this,
                $form = $(cntx);

            this.form = $form;

            $form.submit(function(e) {
                var returnValue = self.check(this);
                var isValidCallBack = true;

                if($(this).data('check')){
                    isValidCallBack = $(this).data('check')();
                }

                if(!(returnValue['isValid'] && isValidCallBack)){
                    $(document).trigger('FORM_ERROR', [{
                        form: $form,
                        ajax: ( $(this).data('submit') == 'ajax' ) ? true : false,
                        status: returnValue['statusError']
                    }]);
                }

                if( returnValue['isValid'] && isValidCallBack){

                    $(document).trigger('FORM_VALID', [{
                        form: $form,
                        ajax: ( $(this).data('submit') == 'ajax' ) ? true : false
                    }]);
                    return false;

                }

                return (returnValue['isValid'] && isValidCallBack);

            });

        };

        CheckForm.prototype={

            check : function(formElmt) {

                var self = this,
                    returnValue = [],
                    $form = $(formElmt);

                returnValue['isValid'] = true,
                returnValue['statusError'] = undefined;

                $form.find('.form-item, label, input, select, textarea').removeClass('error');

                $form.find('.required:visible').each(function() {
                    if(!$(this).is('label') && !$(this).is('input[type=checkbox]')) {
                        if($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
                            returnValue['isValid'] = false;
                            returnValue['statusError'] = 'empty';
                            self.applyError(this);
                        }
                    }
                });

                $form.find('input[type=checkbox].required:visible').each(function(){
                    if(!$(this).is(':checked')){
                        returnValue['isValid'] = false;
                        returnValue['statusError'] = 'empty';
                        self.applyError(this);
                    }
                });


                $form.find('input[data-type=confirm]:visible').each(function() {
                    if($(this).val() != $($(this).data('ref')).val()){
                        returnValue['isValid'] = false;
                        returnValue['statusError'] = 'invalid';
                        self.applyError(this);
                    }
                });


                $form.find('input[data-type=email]:visible').each(function() {
                    console.log('email');
                    if($(this).val() != '' && $(this).val() != $(this).attr('placeholder')) {
                        if(!self.validEmail($(this).val())) {
                            returnValue['isValid'] = false;
                            returnValue['statusError'] = 'invalid';
                            self.applyError(this);
                        }
                    }
                });

                $form.find('input[data-regexp]:visible').each(function() {
                    var value = $(this).val();
                    if(value != '' && value != $(this).attr('placeholder')) {
                        if(!self.validRegExp(value, $(this).data('regexp'))) {
                            returnValue['isValid'] = false;
                            returnValue['statusError'] = 'invalid';
                            self.applyError(this);
                        }
                    }
                });

                return returnValue;

            },

            validRegExp : function(val, reg) {
                var regExp = new RegExp(reg);
                return val.match(regExp);
            },

            validEmail : function(email) {
                var mailExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return email.match(mailExp);
            },

            applyError : function(elmt) {
                $(elmt).addClass('error').closest('.form-item').addClass('error');
                if($(elmt).data('error')){
                    App.log($(elmt).data('error'));
                    $($(elmt).data('error')).show();
                }
                $('label[for=' + $(elmt).attr('id') + ']').addClass('error');
            },

            ajaxSubmit : function( elmt, urlAjax, typeAjax, objAjax ){

                var $this = $(elmt),
                    self = elmt;
                $.ajax({
                    url: urlAjax,
                    type: typeAjax,
                    data: objAjax.serialize(),
                    success: function(data, textStatus, XMLHttpRequest) {
                       if($this.data('success')){
                           $this.data('success').call(self,data);
                       }
                    }
                });

            }
        };

        return CheckForm;

    })();


    $.fn.checkForm = function() {

        var pluginName = "CheckForm";

        return this.each(function() {

          var $self = $(this);

          if($self.data(pluginName)) return;

          var instance = new CheckForm(this);
          $self.data(pluginName, instance);

        });

    }

})(jQuery);
